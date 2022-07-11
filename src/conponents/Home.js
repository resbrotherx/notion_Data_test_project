import React, {useState, useEffect} from 'react';
import { Bar, Doughnut } from 'react-chartjs-2';
import { Chart as ChartJs, ArcElement, BarElement, Tooltip, Legend, CategoryScale, LinearScale} from 'chart.js';

ChartJs.register(
   CategoryScale,
   LinearScale,
   Tooltip,
   Legend,
   BarElement,
   ArcElement
)

const Homepage = () => {
   const [chart, setChart] = useState([])
   const [value, setValue] = useState('')

   var baseUrlsearch =`https://api.coinranking.com/v2/coins?search=${value}`
   var baseUrl = "https://api.coinranking.com/v2/coins?limit=10"
   var proxyUrl = 'https://cors-anywhere.herokuapp.com/'
   var apiKey = 'coinranking3554aa914f7510d84b1244ec7ab0f9addcacf638ee8a6df6'

   useEffect(() => {
      const fetchCoins = async () => {
         await fetch(`${proxyUrl}${baseUrl}`,{
            method: 'Get',
            headers: {
              'x-access-token': `${apiKey}`,
              'Access-Control-Allow-Origin': "*"
            }
         }).then((response) => {
            response.json().then((json) => {
               // console.log(json)
               setChart(json.data)
            })
         }).catch(error => {
            console.log(error)
         })
      }
      fetchCoins()
   },[baseUrl])

   var data = {
      labels: chart?.coins?.map(x => x.name),
      datasets: [{
          label: `${chart?.coins?.length} Coins Available`,
          data: chart?.coins?.map(x => x.price),
          backgroundColor: [
              'rgba(255, 99, 132, 0.2)',
              'rgba(54, 162, 235, 0.2)',
              'rgba(255, 206, 86, 0.2)',
              'rgba(75, 192, 192, 0.2)',
              'rgba(153, 102, 255, 0.2)',
              'rgba(255, 159, 64, 0.2)'
          ],
          borderColor: [
              'rgba(255, 99, 132, 1)',
              'rgba(54, 162, 235, 1)',
              'rgba(255, 206, 86, 1)',
              'rgba(75, 192, 192, 1)',
              'rgba(153, 102, 255, 1)',
              'rgba(255, 159, 64, 1)'
          ],
          borderWidth: 1
      }]
  }
  var options = {
   maintainAspectRatio: false,
   scales: {
       y: {
           beginAtZero: true
       }
   },
   lagend:{
      labels:{
         fontSize:26
      }
   }
 }

   // const [data , setData] = useState([]);

   // useEffect(() => {
   //    loadUserData();
   // }, []);

   // const loadUserData = async () =>{
   //    return await axios.get("https://resbrotherx.com/static/api.json").then((response) => setData(response.data)).catch((err) => console.log(err));
   // };
   const handleSearch = async (e) => {
      e.preventDefault();
      await fetch(`${proxyUrl}${baseUrlsearch}`,{
         method: 'Get',
         headers: {
           'x-access-token': `${apiKey}`,
           'Access-Control-Allow-Origin': "*"
         }
      }).then((response) => {
         response.json().then((json) => {
            // console.log(json)
            setChart(json.data);
            setValue('');
         })
      }).catch(error => {
         console.log(error)
      })
      handleSearch()
   };
   // const handleReset = () => {
   //    // fetchCoins();
   // };

   return (
   <>
      <div className="wrapper">
    <div className="art-bg">
       <img src="http://crmx-admin-template.multipurposethemes.com/bs5/images/art1.svg" alt="" className="art-img light-img" />
       <img src="http://crmx-admin-template.multipurposethemes.com/bs5/images/art3.svg" alt="" className="art-img dark-img" />
    </div>
 
 
    <div className="content-wrapper">
       <div className="container-full">
          <section className="content">
             <div className="row">
                <div className="col-xl-6 col-12">
                   <div className="box">
                      <div className="box-header with-border">
                         <h4 className="box-title">Crypto Bar Chart</h4>
                         <ul className="box-controls pull-right">
                            <li><a className="box-btn-close" href="#"></a></li>
                            <li><a className="box-btn-slide" href="#"></a></li>
                            <li><a className="box-btn-fullscreen" href="#"></a></li>
                         </ul>
                      </div>
                      <div className="box-body text-center">
                         <Bar
                           data={data}
                           options={options}
                           className="h-400"
                         />
                      </div>
                      {/* <!-- /.box-body --> */}
                   </div>
                   {/* <!-- /.box -->			 */}
                </div>
                <div className="col-xl-6 col-12">
                   <div className="box">
                      <div className="box-header with-border">
                         <h4 className="box-title">Crypto Doughnut Chart</h4>
                         <ul className="box-controls pull-right">
                            <li><a className="box-btn-close" href="#"></a></li>
                            <li><a className="box-btn-slide" href="#"></a></li>
                            <li><a className="box-btn-fullscreen" href="#"></a></li>
                         </ul>
                      </div>
                      <div className="box-body text-center">
                        <Doughnut
                           data={data}
                           options={options}
                           className="h-400"
                        />
                      </div>
                      {/* <!-- /.box-body --> */}
                   </div>
                   {/* <!-- /.box -->			 */}
                </div>
               

                <div className="col-12">
                   <div className="box">
                      <div className="box-body">
                         <h4 className="box-title">Filter By:</h4>
                         <div className="table-responsive">

          
          <div className="col-sm-12">
          <div class="dt-buttons btn-group">

               {/* <button class="btn btn-secondary buttons-copy buttons-html5" tabindex="0" aria-controls="example" onClick={() => handleFilterPrice()}><span>Price</span></button>
               <button class="btn btn-secondary buttons-csv buttons-html5" tabindex="0" aria-controls="example" onClick={() => handleFilterBitcoin('Bitcoin')}><span>Bitcoin</span></button>
                 */}
               </div>

            <div id="example1_filter" claclassNamess="dataTables_filter" style={{float:'right'}}>
             <form  onSubmit={handleSearch}>  <label>Search:<input type="search" class="form-control form-control-sm" placeholder="" aria-controls="example1" value={value} onChange={(e) => setValue(e.target.value)}/></label>
              <button className='btn btn-block btn-success btn-sm' type='submit'>Search</button>
             {/* <button onClick={() => handleReset()}>Reset</button> */}
             </form>
            </div></div>
                            <table className="table table-striped table-hover mb-0">
                               <thead>
                                  <tr>
                                     <th className="bb-2">No.</th>
                                     <th className="bb-2">Logos</th>
                                     <th className="bb-2">Names</th>
                                     <th className="bb-2">Price</th>
                                     <th className="bb-2">symbol</th>
                                     <th className="bb-2">marketCap</th>
                                     <th className="bb-2">btc Price</th>
                                     <th className="bb-2">change</th>
                                     <th className="bb-2">rank</th>
                                     <th className="bb-2">listed At</th>
                                  </tr>
                               </thead>
                               { chart?.coins?.length === 0 ? (
                                 <tbody style={{color:'#fff',alignItem:'center',textAlign:'center',}}>

                                 <tr style={{color:'#fff',alignItem:'center',textAlign:'center',}}>
                                    <td style={{color:'#fff',alignItem:'center',textAlign:'center',}}>No Data Found..</td>
                                 </tr>
                              </tbody>

                               ):(
                                 chart?.coins?.map((item, index) => (
                                 <tbody style={{color:"#fff"}} key={index}>

                                  <tr style={{color:"#fff"}}>
                                    <th style={{color:"#fff"}}>{index+1}</th>
                                     <td><img className="avatar avatar-lg" src={item.iconUrl} alt="..."/></td>
                                     <td style={{color:"#fff"}}>{item.name}</td>
                                     <td style={{color:"#fff"}}>{item.price}</td>
                                     <td><span className="badge">{item.symbol}</span></td>
                                     <td style={{color:"#fff"}}>{item.marketCap}</td>
                                     <td style={{color:"#fff"}}>{item.btcPrice}</td>
                                     <td style={{color:"#fff"}}>{item.change}</td>
                                     <td><span className="badge badge-success">{item.rank}</span></td>
                                     <td style={{color:"#fff"}}>{item.listedAt}</td>
                                
                                  </tr>
                               </tbody>
                                 ))
                               )}
                              
                            </table>
                         </div>
                      </div>
                      {/* <!-- /.box-body --> */}
                   </div>
                </div>
             </div>
          </section>
       </div>
    </div>
 </div>


   </>
   )   
};
export default Homepage