<template xmlns:v-slot="http://www.w3.org/1999/XSL/Transform">
  <div id="app">
    <v-app id="inspire">
      <div v-if="data">
        <v-card-title>
          Contrôles
          <v-spacer></v-spacer>
          <v-text-field
            v-model="search"
            append-icon="search"
            label="Search"
            single-line
            hide-details
          ></v-text-field>
        </v-card-title>
        <v-data-table :search="search" :headers="headers" :items="data" class="elevation-1">
          <template v-slot:items="props">
            <td   v-for="(item, key) in headers" :key="key"><p v-bind:class='props.item["blue"]'>{{props.index}} {{ props.item[item.value] }}</p></td>
          </template>
        </v-data-table>
      </div>
      <div v-else>
        data not found go to
        <router-link to="/importation">importation</router-link>and import for see data
      </div>
    </v-app>
  </div>
</template>

<script>
export default {
  data() {
    return {
      search: ""
    };
  },
  created: function(){

       },
   methods:{
           min: function(val1, val2, val3, index1, index2, index3){
              if(parseFloat(val1["Cotes Première"].replace(",",".")) <= parseFloat(val2["Cotes Première"].replace(",","."))
               && parseFloat(val1["Cotes Première"].replace(",",".")) <= parseFloat(val3["Cotes Première"].replace(",","."))){
                    return index1;
                }
             else if(parseFloat(val2["Cotes Première"].replace(",",".")) <= parseFloat(val1["Cotes Première"].replace(",","."))
             && parseFloat(val2["Cotes Première"].replace(",",".")) <= parseFloat(val3["Cotes Première"].replace(",","."))){
                    return index2;
                }
              else if( parseFloat(val3["Cotes Première"].replace(",",".")) <= parseFloat(val1["Cotes Première"].replace(",","."))
               && parseFloat(val3["Cotes Première"].replace(",",".")) <= parseFloat(val2["Cotes Première"].replace(",","."))){
                    return index3;
                }
               }
           },
    computed: {
    data() {
    var onentwo=[];
    var handicap=[];
     this.$store.state.data.map((item, index)=>{
            if(item["Pari"].includes("1 N 2")  && !item["Pari"].includes("Handicap")){
                item["inlist"]=true;
                item["index"]=index;
                item["group"]="1n2";
                item["blue"]="none";
                item["fav"]=false;
                onentwo.push(item);
            }
             else if(item["Pari"].includes("1 N 2") && item["Pari"].includes("Handicap")){
                         item["group"]="handicap";
                         item["inlist"]=true;
                         item["index"]=index;
                        item["blue"]="none";
                        item["fav"]=false;
                        handicap.push(item)
            }
            else{
                item["inlist"]=false;
                item["index"]=index;
                item["group"]="none";
                item["blue"]="none";
                item["fav"]=false;
            }
            })
            console.log("this is 1 n 2", onentwo);
                        //onentwo
                       var ioneindex =0;
                        var winner="";
                        var aswholewinner="";
                       while(ioneindex <= onentwo.length-4){


                       var minimum = this.min(onentwo[ioneindex],
                       onentwo[ioneindex+1],onentwo[ioneindex+2],ioneindex,ioneindex+1,ioneindex+2);
                       console.log("this is ok",minimum,onentwo[ioneindex+2]["Cotes Première"]);

                       if(ioneindex <3){
                       aswholewinner=onentwo[minimum]["Paris/Pronostics"].replace(/[{()}]/g, '').replace(/[0-9]/g, '').replace("+","").replace("-","");;
                       onentwo[minimum]["blue"]="green";
                       }

                       winner=onentwo[minimum]["Paris/Pronostics"];
                       if(ioneindex >=3){
                            if(onentwo[ioneindex]["Evénement"] !== onentwo[ioneindex-1]["Evénement"]){
                               var newwinner= this.min(onentwo[ioneindex],
                               onentwo[ioneindex+1],onentwo[ioneindex+2],ioneindex,ioneindex+1,ioneindex+2);
                               onentwo[newwinner]["blue"]="green";
                               aswholewinner= onentwo[newwinner]["Paris/Pronostics"].replace(/[{()}]/g, '').replace(/[0-9]/g, '').replace("-","").replace("+","");
                               console.log("this is the winner",winner);
                            }
                            else{
                                if(!aswholewinner.replace(/[{()}]/g, '').replace(/[0-9]/g, '').replace("+","").replace("-","").includes(
                                                                winner.replace(/[{()}]/g, '').replace(/[0-9]/g, '').replace("+","").replace("-","")
                                )
){
                                    onentwo[minimum]["blue"]= "red";
                                }
                            }
                       }
                       console.log("this is the ionindex", ioneindex, winner);
                       ioneindex =ioneindex +3;
                       }
                       console.log("this is the max value");

                      var selfi= this;
                        onentwo.map((item)=>{
                                 selfi.$store.state.data[item["index"]]= item;
                         })
                     //onentwo

            //handicaps
                    var index=0;
                      var valuetocheck=0;
                    while(index  <= handicap.length -4){


                    if(index<3){
                         valuetocheck=   handicap[index]["Cotes Première"].replace(",",".");
                    }
                    if(index >=3){
                            if(handicap[index]["Evénement"] !== handicap[index-1]["Evénement"] ){
                                valuetocheck =handicap[index]["Cotes Première"].replace(",",".");
                            }
                            else{
                            if(parseFloat(valuetocheck) < parseFloat(handicap[index]["Cotes Première"].replace(",","."))){
                               handicap[index]["blue"]= "red";
                                console.log("this is ierro hand",valuetocheck, handicap[index+2]["Cotes Première"].replace(",","."));
                               }
                                console.log("this is ierro hand",valuetocheck, handicap[index+2]["Cotes Première"].replace(",","."));
                                  valuetocheck=   handicap[index]["Cotes Première"].replace(",",".");
                            }
                    }
                        index=index+3;
                    }
                   var indexi=0;
                     var valuetochecki=0;
                       while(indexi  <= handicap.length -4){


                                          if(indexi<3){
                                               valuetochecki=handicap[indexi+2]["Cotes Première"].replace(",",".");
                                                console.log("this is <3",valuetochecki);
                                          }
                                          if(indexi >=3){
                                                  if(handicap[indexi]["Evénement"] !== handicap[indexi-1]["Evénement"] ){
                                                      valuetochecki =handicap[indexi+2]["Cotes Première"].replace(",",".");
                                                       console.log("this is >3",valuetochecki, indexi);
                                                  }
                                                  else{
                                                  if(parseFloat(valuetochecki) > parseFloat(handicap[indexi+2]["Cotes Première"].replace(",","."))){
                                                     console.log("this is ierro",valuetochecki, handicap[indexi+2]["Cotes Première"].replace(",","."));
                                                     handicap[indexi+2]["blue"]= "red";
                                                     }
                                                      console.log("this is ierro",valuetochecki, handicap[indexi+2]["Cotes Première"].replace(",","."));
                                                       valuetochecki=handicap[indexi+2]["Cotes Première"].replace(",",".");
                                                  }
                                          }
                                              indexi=indexi+3;
                                          }
                   var self=this;
                handicap.map((item)=>{
                            if(item["blue"] === "red"){
                                        console.log("This is ok");
                            }
                            else{
                                console.log("right");
                            }
                               self.$store.state.data[item["index"]]= item;
                })
                //handicap
      return this.$store.state.data;
    },

    headers() {

      return Object.keys(this.data[0])
        .slice(0, 11)
        .map(k => ({
          text: k,
          value: k,
          width: "1%",
        }));
    },
  }
};
</script>

<style scoped>
table.v-table tbody td:first-child, table.v-table tbody td:not(:first-child), 
table.v-table tbody th:first-child, table.v-table tbody th:not(:first-child), 
table.v-table thead td:first-child, table.v-table thead td:not(:first-child), 
table.v-table thead th:first-child, table.v-table thead th:not(:first-child) {
  padding: 0 10px !important;
  width: 1%
}
.red{
    color:red;
    background:white;
    background-color: white!important;
        border-color: white!important;
}
.green{
    color:green;
   background:white;
   background-color: white!important;
       border-color: white!important;
}
.none{
    color:black;
background-color: white!important;
    border-color: white!important;
}
</style>

