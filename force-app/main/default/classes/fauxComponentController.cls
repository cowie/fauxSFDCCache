public with sharing class fauxComponentController {
    public class fauxRecord{
        @AuraEnabled public integer integerValue{get;set;}
        @AuraEnabled public decimal dollarValue{get;set;}
        @AuraEnabled public dateTime dateTimeValue{get;set;}
        @AuraEnabled public integer itemNumber{get;set;}

        public fauxRecord(){}
    }

    @AuraEnabled(cacheable=true)
    public static List<fauxRecord> getFauxData(string targetRecordID){
        //check cache for targetRecordID
        /*
        kv should look like
        key: recordID (15-18digit sf id)
        value: [
            {
                integerValue:,
                dollarValue:,
                dateValue,
            }, ...
        ]
        */
        long startTime = system.currentTimeMillis();
        if(!Cache.Org.contains(targetRecordID)){
            //not good, make a callout
            HttpRequest req = new HttpRequest();
            req.setEndpoint('https://cdg-cache-faux-data-endpoint.herokuapp.com/getFauxProductData?maxQuantity=5');
            req.setMethod('GET');

            Http h = new Http();
            HttpResponse resp = h.send(req);
            List<fauxRecord> fr = new List<fauxRecord>();
            system.debug(resp.getBody());
            fr = (List<fauxRecord>)JSON.deserializeStrict(resp.getBody(), List<fauxRecord>.class);
            system.debug(fr);
            //push content into cache
            Cache.Org.put(targetRecordID, fr);
            system.debug('added to org cache');
            system.debug('time to do full fetch');
            long elapsedTime = System.currentTimeMillis() - startTime;
            system.debug(elapsedTime);
            return fr;
        }else{
            //good, return
            system.debug(Cache.Org.get(targetRecordID));
            system.debug('fetched from org cache');
            system.debug('time to do cache fetch');
            long elapsedTime = System.currentTimeMillis() - startTime;
            system.debug(elapsedTime);
            return (List<FauxRecord>)Cache.Org.get(targetRecordID);
        }
        //if good, return
        //if not, make callout
    }
}
