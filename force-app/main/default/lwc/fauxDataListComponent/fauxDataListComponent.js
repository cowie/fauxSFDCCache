import { LightningElement, api, track, wire } from 'lwc';
import {refreshApex} from '@salesforce/apex';
import getFauxRecords from '@salesforce/apex/fauxComponentController.getFauxData';
import refreshFauxData from '@salesforce/apex/fauxComponentController.refreshFauxData';

export default class FauxDataListComponent extends LightningElement {
    @api tableTitle;
    @api adminItemNoLabel;
    @api adminIntegerLabel;
    @api adminDollarLabel;
    @api adminDateTimeLabel;
    @api recordId;
    @track fauxRecords;
    @track error;
    @track fauxColumns; 

    wiredFauxColumnResult;

    @wire(getFauxRecords, {targetRecordID: '$recordId'})
    handleFauxRecords(data, error){
        this.wiredFauxColumnResult = data;
        if(data){
            this.fauxColumns = [
                {label: this.adminItemNoLabel, fieldName: 'itemNumber', type:'number'},
                {label: this.adminIntegerLabel, fieldName: 'integerValue', type:'number'},
                {label: this.adminDollarLabel, fieldName: 'dollarValue', type:'currency'},
                {label: this.adminDateTimeLabel, fieldName: 'dateTimeValue', type:'date'}
            ];
            this.fauxRecords = data;
            this.error = undefined;
        }else if (error){
            console.log('error time');
            this.error = error;
            console.error(error);
        }
    }
    
    requestForcedRefresh(){
        refreshFauxData({targetRecordID: this.recordId})
            .then((data) => {
                console.log('data');
                console.log(data);
                this.fauxRecords = [];
                this.fauxRecords = [...data];
                this.error = undefined;
                return refreshApex(this.wiredFauxColumnResult);
            })
            .catch((error) => {
                console.log('error time');
                this.error = error;
                 console.error(error);
            });
    }
    
}