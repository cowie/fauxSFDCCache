import { LightningElement, api, track, wire } from 'lwc';
import getFauxRecords from '@salesforce/apex/fauxComponentController.getFauxData';

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

    @wire(getFauxRecords, {targetRecordID: '$recordId'})
    handleFauxRecords(data, error){
        if(data){
            this.fauxColumns = [
                {label: this.adminItemNoLabel, fieldName: 'itemNumber', type:'number'},
                {label: this.adminIntegerLabel, fieldName: 'integerValue', type:'number'},
                {label: this.adminDollarLabel, fieldName: 'dollarValue', type:'currency'},
                {label: this.adminDateTimeLabel, fieldName: 'dateTimeValue', type:'date'}
            ];
            console.log('data');
            console.log(data);
            this.fauxRecords = data;
            this.error = undefined;
        }else if (error){
            console.log('error time');
            this.error = error;
            console.error(error);
        }
    }
    
}