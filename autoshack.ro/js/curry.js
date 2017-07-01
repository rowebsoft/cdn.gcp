(function($){$.fn.curry=function(options){if(!window.jQCurryPluginCache)
window.jQCurryPluginCache=[{},false];var output='',rates={},t=this,requestedCurrency=window.jQCurryPluginCache[1],$document=$(document),dropDownMenu,item,keyName,i,l,rate;var settings=$.extend({target:'price-curry',change:true,base:getSiteCurrency(),symbols:{}},options);this.each(function(){var $this=$(this),id=$this.attr('id'),classes=$this.attr('class'),attrs='',tempHolder;attrs+=id?' id="'+ id+'"':'';if(classes){attrs+=' class="curry-ddm form-control';if(classes)
attrs+=' '+ classes+'"';else
attrs+='"';}else{attrs+='';}
output='<select'+ attrs+'></select>';tempHolder=$(output).insertAfter($this);$this.detach();dropDownMenu=!dropDownMenu?tempHolder:dropDownMenu.add(tempHolder);});var generateDDM=function(rates){output='';dropDownMenu.each(function(){for(i in rates){rate=rates[i];output+='<option value="'+ i+'" data-rate="'+ rate+'">'+ i+'</option>';}
$(output).appendTo(this);$('.curry-ddm').select2({"language":"es"}).select2('destroy').select2({"language":"es"});});};if(!settings.customCurrency){if(!requestedCurrency){var query='';var selected_currencies=$('.curry').data('currencies');selected_currencies=selected_currencies.split(',');savedCurrency=getSavedCurrency();var major_currencies=savedCurrency+'USD,'+savedCurrency+'EUR,'+savedCurrency+'GBP,'+savedCurrency+'JPY,'+savedCurrency+'CAD,'+savedCurrency+'CHF,'+savedCurrency+'AUD,'+savedCurrency+'ZAR,';var european_currencies=savedCurrency+'ALL,'+savedCurrency+'BGN,'+savedCurrency+'BYR,'+savedCurrency+'CZK,'+savedCurrency+'DKK,'+savedCurrency+'EUR,'+savedCurrency+'GBP,'+savedCurrency+'HRK,'+savedCurrency+'HUF,'+savedCurrency+'ISK,'+savedCurrency+'NOK,'+savedCurrency+'RON,'+savedCurrency+'RUB,'+savedCurrency+'SEK,'+savedCurrency+'UAH,';var skandi_currencies=savedCurrency+'DKK,'+savedCurrency+'SEK,'+savedCurrency+'NOK,';var asian_currencies=savedCurrency+'JPY,'+savedCurrency+'HKD,'+savedCurrency+'SGD,'+savedCurrency+'TWD,'+savedCurrency+'KRW,'+savedCurrency+'PHP,'+savedCurrency+'IDR,'+savedCurrency+'INR,'+savedCurrency+'CNY,'+savedCurrency+'MYR,'+savedCurrency+'THB,';var americas_currencies=savedCurrency+'USD,'+savedCurrency+'CAD,'+savedCurrency+'MXN,'+savedCurrency+'BRL,'+savedCurrency+'ARS,'+savedCurrency+'CRC,'+savedCurrency+'COP,'+savedCurrency+'CLP,';if(selected_currencies==''){query='select * from yahoo.finance.xchange where pair="\
                                          '+savedCurrency+'USD,\
                                          '+savedCurrency+'EUR,\
                                          '+savedCurrency+'INR,\
                                          '+savedCurrency+'GBP,\
                                          '+savedCurrency+'CAD,\
                                          '+savedCurrency+'AED,\
                                          '+savedCurrency+'BGN,\
                                          '+savedCurrency+'BDT,\
                                          '+savedCurrency+'CZK,\
                                          '+savedCurrency+'DKK,\
                                          '+savedCurrency+'HRK,\
                                          '+savedCurrency+'HUF,\
                                          '+savedCurrency+'IDR,\
                                          '+savedCurrency+'JPY,\
                                          '+savedCurrency+'NOK,\
                                          '+savedCurrency+'PLN,\
                                          '+savedCurrency+'RON,\
                                          '+savedCurrency+'RUB,\
                                          '+savedCurrency+'ALL,\
                                          '+savedCurrency+'SEK,\
                                          '+savedCurrency+'PHP,\
                                          '+savedCurrency+'TRY,\
                                          '+savedCurrency+'PKR,\
                                          '+savedCurrency+'VND,\
                                          '+savedCurrency+'RSD,\
                                          '+savedCurrency+'CNY\
                                          "';}else{query='select * from yahoo.finance.xchange where pair="'+savedCurrency+getSiteCurrency()+',';for(i=0;i<selected_currencies.length;i++){selected_currencies[i]=selected_currencies[i].trim();if(selected_currencies[i]=='major')
query+=major_currencies;else if(selected_currencies[i]=='european')
query+=european_currencies;else if(selected_currencies[i]=='skandi')
query+=skandi_currencies;else if(selected_currencies[i]=='asian')
query+=asian_currencies;else if(selected_currencies[i]=='american')
query+=americas_currencies;else
query+=savedCurrency+selected_currencies[i]+',';}
query=query.slice(0,-1);query+='"';}
var jqxhr=$.ajax({url:'https://query.yahooapis.com/v1/public/yql',dataType:'jsonp',data:{q:query,format:'json',env:'store://datatables.org/alltableswithkeys'}});window.jQCurryPluginCache[1]=true;jqxhr.done(function(data){var items=data.query.results.rate;rates[settings.base]=1;for(var i=0,l=items.length;i<l;i++){item=items[i];keyName=item.Name.substr(item.Name.length- 3);rates[keyName]=+item.Rate;}
generateDDM(rates);window.jQCurryPluginCache[0]=rates;$document.trigger('jQCurryPlugin.gotRates');}).fail(function(err){console.log(err);});}else{$document.on('jQCurryPlugin.gotRates',function(){generateDDM(window.jQCurryPluginCache[0]);});}}else{generateDDM(settings.customCurrency);}
var symbols=$.extend({'USD':'&#36;','AUD':'&#36;','CAD':'&#36;','MXN':'&#36;','BRL':'&#36;','GBP':'&pound;','EUR':'&euro;','JPY':'&yen;','INR':'&#8377;','BDT':'&#2547;','PHP':'&#8369;','VND':'&#8363;','CNY':'&#165;','UAH':'&#8372;','HKD':'&#36;','SGD':'&#36;','TWD':'&#36;','THB':'&#3647;',},settings.symbols),$priceTag,symbol;$document.on('change',this.selector,function(){var $target=$(settings.target),$option=$(this).find(':selected'),rate=$option.data('rate'),has_comma=false,money,result,l=$target.length;for(var i=0;i<l;i++){$price=$($target[i]);money=$price.text();money=Number(money.replace(/[^0-9\.]+/g,''));if($price.data('base-figure')){result=rate*$price.data('base-figure');}else{$price.data('base-figure',money);result=rate*money;}
result=Number(result.toString().match(/^\d+(?:\.\d{2})?/));if(has_comma){result=result.toString().replace('.',',');has_comma=false;}
symbol=symbols[$option.val()]||$option.val();$price.html('<span class="symbol">'+ symbol+'</span> '+ result);}});return dropDownMenu;};})(jQuery);