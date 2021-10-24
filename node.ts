
//const output = [900, 295];
const balances = [1000, 1500];

const requests = [   "withdraw 1613327630 2 480",                       // 86400 (24h in seconds)
                     "withdraw 1613327644 2 800", 
                     "withdraw 1614105244 1 100", 
                     "deposit  1614108844 2 200", 
                     "withdraw 1614108845 2 150" 
                 ]

function bank_Requests_Daily_Cashback(balances:number[], requests:any[])
{
    const output = [];
      const requests_object = fomat_requests(requests);
      // if withdraw true .. call cashback
      // withra > balance rfuse request
      // of request is invaled return [- holder_id]
      // if withrwas then cashback -calculate cahsbak timestamp (withd-request-timestamp+86400)< last-req-timestamp then update balance 
      // else cahsbak timestamp  >  ( last-request-timestamp ) then igonore cahsback
     // console.log(requests_object)
     let last_request_timeStamp = requests_object.slice(-1).map(last_request_timeStamp =>{
         return Number(last_request_timeStamp.time_stamp);
     });

      requests_object.forEach( request => {
        
       if(request.operation_type == 'withdraw')
         {
           if(withdraw(Number(request.time_stamp), Number(last_request_timeStamp), Number(request.account_id), Number(request.amount)))
           {
                if(valid_cashback(Number(request.time_stamp)+86400,  Number(last_request_timeStamp)))
                {
                     //cashback(holder_id: Number, amount: Number)   //  withdraw amount of money from the account.
                }
               else
                {
                        return;
                }
           }
         else
            {
                // return [-holder_id]
            }
         }

       if(request.operation_type == 'deposit')
         {
          deposit(Number(request.time_stamp), Number(request.account_id), Number(request.amount)) 
         }
      })
}

function withdraw(timestamp: Number,last_request_timeStamp: number, holder_id: Number, amount: Number)   //  withdraw amount of money from the account. 
{
    if(valid_withdraw_request(amount, holder_id))
    {
      // update balance
    }
  return true;
}

function deposit(timestamp: Number, holder_id: Number, amount: Number)     //  deposit amount of money to account. 
{
 // every depost pushes to array of account (balances) and  return it 
 return true;
}

function cashback(holder_id: Number, amount: Number)   //  withdraw amount of money from the account. 
{
  // update balance

}

function valid_cashback(cashBack_timeStamp:Number, last_request_timeStamp:Number )
{
    // calculate cahsbak timestamp (withd-request-timestamp+86400)< last-req-timestamp then true
      // else cahsbak timestamp  >  ( last-request-timestamp ) then igonore cahsback
 return true;
}

function valid_withdraw_request(amount:Number, balance:Number)
{
    return true;

}

function fomat_requests ( requests:string[])
{
    let withdraw_operations = [];
    let deposit_operations = [];
    let requests_object = [];

    for (let i = 0; i < requests.length; i++)
    {
        // split on space and remove empty arrays
      let arr = requests[i].split(" ").filter( (request: string)=>  { return request != ''}  );
          
              let schema = { 
                              operation_type : arr[0],
                              time_stamp: arr[1],
                              account_id:arr[2],
                              amount: arr[3]
                           }
              requests_object.push(schema) ;           
                 
    }
  return requests_object

}

//console.log(bank_Requests_Daily_Cashback(balances, requests));
bank_Requests_Daily_Cashback(balances, requests)
