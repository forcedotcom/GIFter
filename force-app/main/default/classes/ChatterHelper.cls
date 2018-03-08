public with sharing class ChatterHelper {
    
  @AuraEnabled
  public static String getChatterGroups(String imageUrl, String chatterText) {

    String fileName = 'giphy.gif';
    String body = chatterText;
    
    Blob imageData = getImageData(imageUrl);

    ID fileId = saveFile(fileName, imageData);
    ID postParentId = UserInfo.getUserId();

    FeedItem post = new FeedItem(
        ParentId = postParentId,
        Body = body,
        IsRichText = true
    );

    insert post;

    String feedItemId = post.Id;

    // Add image(s) to the chatter post
    // Requires 'Allow users to edit posts and comments' in Setup | Chatter | Chatter Settings
    // because adding the feed attachments edits the original post.
    // http://salesforce.stackexchange.com/questions/156588/feedattachment-invalid-operation-cannot-create-update-or-delete-feed-attachme
    List<FeedAttachment> feedAttachments = new List<FeedAttachment>();
    feedAttachments.add( new FeedAttachment(
      feedEntityId = feedItemId,
      recordId = fileId,
      type = 'Content'
    ));

    insert feedAttachments;

    return feedItemId;
  }

  private static ID saveFile(String fileNameWithExt, Blob fileData) {

    ContentVersion file = new ContentVersion(
        versionData = fileData,
        title = fileNameWithExt,
        pathOnClient = '/' + fileNameWithExt
    );

    insert file;

    return file.Id;
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
