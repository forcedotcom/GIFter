import { LightningElement, track } from 'lwc';
import { NavigationMixin } from 'lightning/navigation';
import { ShowToastEvent } from 'lightning/platformShowToastEvent'
import { loadScript } from 'lightning/platformResourceLoader';
import _GIPHY from '@salesforce/resourceUrl/GIPHY';
import chatterPostWithImage from '@salesforce/apex/ChatterHelper.getChatterGroups';

export default class SearchGiphyLwc extends NavigationMixin(LightningElement) {
    @track searchTerms = '';
    @track results;
    
    @track showPopup = false;
    @track showSpinner = false;
    chatterText = '';
    selectedGif;
    selectedGifUrl;
    feedItemId;
    apiKey;

    connectedCallback() {
        loadScript(this, _GIPHY)
        .then(() => {
            this.apiKey = window._GIPHY.getApiKey();
        })
        .catch(error => {
            this.dispatchEvent(
                new ShowToastEvent({
                    title: 'Error reading Api Key',
                    message: error.message,
                    variant: 'error'
                })
            );
        })
    }

    navigateToChatterPost() {
        this[NavigationMixin.Navigate]({
            type: 'standard__recordPage',
            attributes: {
                recordId: this.feedItemId,
                objectApiName: 'FeedItem',
                actionName: 'view'
            }
        });
    }
    
    createChatterPost() {
        this.showSpinner = true;
        chatterPostWithImage({ imageUrl:this.selectedGifUrl, chatterText:this.chatterText})
        .then(result => {
            this.feedItemId = result;
            this.chatterText = '';
            this.selectedGif = '';
            this.selectedGifUrl = '';
            this.showSpinner = false;
            this.showPopup = false;
            this.navigateToChatterPost();
        })
        .catch(error => {
            this.dispatchEvent(
                new ShowToastEvent({
                    title: 'Error Creating Post',
                    message: error.message,
                    variant: 'error'
                })
            );
            this.showSpinner = false;
        })
    }

    togglePopup() {
        this.showPopup = !this.showPopup;
    }

    handleGiphySearch(event) {
        this.searchTerms = this.template.querySelector(".inputClass").value;
        let searchTerms = encodeURI(this.searchTerms);
        let url = "https://api.giphy.com/v1/gifs/search?api_key=" + this.apiKey + "&q=" + searchTerms + "&limit=8&offset=0&rating=G&lang=en";
        fetch(url)
        .then(response => {
            return response.json(); 
        })
        .then(resp => {
            // Here we get the data array from the response object
            this.results = resp.data;
        })
        .catch(error => {
            this.dispatchEvent(
                new ShowToastEvent({
                    title: 'Error Searching Giphy',
                    message: error.message,
                    variant: 'error'
                })
            );
        })
    }
    keyCheck(event) {
        if (event.which == 13) { this.handleGiphySearch(); }
      }
    gifSelect(event){
        let id = event.target.dataset.index;
        this.selectedGif = this.results.find(item => item.id === id);
        const regex = /media[0-9].giphy/gi;
        let imageUrl =  this.selectedGif.images.fixed_height.url;
        this.selectedGifUrl = imageUrl.replace(regex, 'media0.giphy');
        this.togglePopup();
    }
    postToChatter(event){
        this.chatterText = this.template.querySelector(".chatterText").value;
        this.createChatterPost();
    }
    
}
