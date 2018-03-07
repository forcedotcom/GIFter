public with sharing class ChatterHelper {
    
  @AuraEnabled
  public static String getChatterGroups() {

    // System.debug('getChatterGroups');

    // ConnectApi.ContentHubRepositoryCollection repositoryCollection = ConnectApi.ContentHub.getRepositories();

    // System.debug('repository');

    // for(ConnectApi.ContentHubRepository repository : repositoryCollection.repositories){

    //   System.debug(repository);

    // }





//     String userId = UserInfo.getUserId();
//     System.debug('userId: ' + userId);
    
//     String communityId = null;
//     String imageId = '069D00000001INA'; // need to replace
//     // String mentionedUserId = '005D0000001QNpr'; 
//     String targetUserOrGroupOrRecordId  = 'me';  // is this right?

//     ConnectApi.FeedItemInput input = new ConnectApi.FeedItemInput();
//     input.subjectId = targetUserOrGroupOrRecordId;
//     input.feedElementType = ConnectApi.FeedElementType.FeedItem;

//     ConnectApi.MessageBodyInput messageInput = new ConnectApi.MessageBodyInput();
//     ConnectApi.TextSegmentInput textSegment;
//     ConnectApi.MentionSegmentInput mentionSegment;
//     ConnectApi.MarkupBeginSegmentInput markupBeginSegment;
//     ConnectApi.MarkupEndSegmentInput markupEndSegment;
//     ConnectApi.InlineImageSegmentInput inlineImageSegment;

//     System.debug('here 1');

//     messageInput.messageSegments = new List<ConnectApi.MessageSegmentInput>();

//     markupBeginSegment = new ConnectApi.MarkupBeginSegmentInput();
//     markupBeginSegment.markupType = ConnectApi.MarkupType.Bold;
//     messageInput.messageSegments.add(markupBeginSegment);

//     System.debug('here 2');

//     textSegment = new ConnectApi.TextSegmentInput();
//     textSegment.text = 'Hello ';
//     messageInput.messageSegments.add(textSegment);

//     System.debug('here 3');

//     // mentionSegment = new ConnectApi.MentionSegmentInput();
//     // mentionSegment.id = mentionedUserId;
//     // messageInput.messageSegments.add(mentionSegment);

//     System.debug('here 4');

//     textSegment = new ConnectApi.TextSegmentInput();
//     textSegment.text = '!';
//     messageInput.messageSegments.add(textSegment);

//     System.debug('here 5');

//     markupEndSegment = new ConnectApi.MarkupEndSegmentInput();
//     markupEndSegment.markupType = ConnectApi.MarkupType.Bold;
//     messageInput.messageSegments.add(markupEndSegment);

//     System.debug('here 6');

// inlineImageSegment = new ConnectApi.InlineImageSegmentInput();
// inlineImageSegment.altText = 'image one';
// inlineImageSegment.fileId = imageId;
// messageInput.messageSegments.add(inlineImageSegment);

//     input.body = messageInput;

//     System.debug('here 7');

//     ConnectApi.ChatterFeeds.postFeedElement(communityId, input, null);

//     System.debug('here 8');

    return 'finished';
  }
}
