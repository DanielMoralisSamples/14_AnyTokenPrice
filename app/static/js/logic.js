Moralis.initialize(""); // Application id from moralis.io
Moralis.serverURL = ""; //Server url from moralis.io

//dApp frontend logic
async function login(){
  document.getElementById('submit').setAttribute("disabled", null);
  document.getElementById('username').setAttribute("disabled", null);
  document.getElementById('useremail').setAttribute("disabled", null);
  Moralis.Web3.authenticate().then(function (user) {
      user.set("name",document.getElementById('username').value);
      user.set("email",document.getElementById('useremail').value);
      user.save();
      getBalances();
  })
}

/* Valid values for chain in https://docs.moralis.io/moralis-server/transactions-and-balances/intro */


async function getBalances(){
  const balances = await Moralis.Web3.getAllERC20( { chain: "" }).then(buildTable);
}


function buildTable(data){
  document.getElementById("resultSpace").innerHTML =  `<table class="table table-dark table-striped" id="myTable">
                                                       </table>`;
  const table = document.getElementById('myTable');
  const rowHeader = `
                  <thead>
                      <tr>
                          <th>Token</th>
                          <th>Symbol</th>
                          <th>Balance</th>
                      </tr>
                  </thead>`;
  table.innerHTML += rowHeader;
  for (var i = 0; i < data.length; i++){
      var row = `<tr>
                      <td>${data[i].name}</td>
                      <td>${data[i].symbol}</td>
                      <td>${data[i].balance/10**18}</td>
                </tr>`
      table.innerHTML += row
 } 
}