public with sharing class ChatterHelper {
    
  @AuraEnabled
  public static String getChatterGroups(String imageUrl, String chatterText) {

    String fileName = 'giphy.gif';
    String body = chatterText;
    
    Blob imageData = getImageData(imageUrl);

    ID fileId = saveFile(fileName, imageData);

    // Use Salesforce "ConnectApi" class so the animated Gif may be embedded Inline
    ConnectApi.MessageBodyInput messageInput = new ConnectApi.MessageBodyInput();
    messageInput.messageSegments = new List<ConnectApi.MessageSegmentInput>();

    ConnectApi.TextSegmentInput textSegment = new ConnectApi.TextSegmentInput();
    textSegment.text = chatterText;
    messageInput.messageSegments.add(textSegment);

    ConnectApi.InlineImageSegmentInput inlineImageSegment = new ConnectApi.InlineImageSegmentInput();
    inlineImageSegment.fileId = fileId;
    inlineImageSegment.altText = chatterText;
    messageInput.messageSegments.add(inlineImageSegment);

    ConnectApi.FeedItemInput input = new ConnectApi.FeedItemInput();
    input.body = messageInput;
    input.subjectId = 'me';

    ConnectApi.FeedElement fe = ConnectApi.ChatterFeeds.postFeedElement(Network.getNetworkId(), input);
    return fe.Id;
  }

  private static ID saveFile(String fileNameWithExt, Blob fileData) {

    ContentVersion file = new ContentVersion(
        versionData = fileData,
        title = fileNameWithExt,
        pathOnClient = '/' + fileNameWithExt
    );

    insert file;

    // The ConnectApi class requires a ContentDocument Id -- not the ContentVersion Id
    ContentVersion file2 = [select id,ContentDocumentId from ContentVersion where id= :file.id];
    return file2.ContentDocumentId;
  }

  private static Blob getImageData(String url) {

    HttpRequest req = new HttpRequest();
    req.setEndpoint( url );
    req.setHeader('accept', 'image/*');
    
    req.setMethod('GET');
    req.setCompressed( false );

    HttpResponse res = new Http().send( req );
    return res.getBodyAsBlob();
  }

}
