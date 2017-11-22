import React, { Component,  PropTypes} from 'react'
import styles from './styles.scss';
import { connect} from 'react-redux';
import { Route, Switch,Link,NavLink,withRouter,  BrowserRouter as Router } from 'react-router-dom';
import Select from 'react-select';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import SelectVirtualMachineWiz from '../SelectVirtualMachineWiz/SelectVirtualMachineWiz';
import VirtualDiskProperties from '../VirtualDiskProperties/VirtualDiskProperties';

import  Clock from '../Clock/Clock';



class DiskRestoreWiz extends Component {
    constructor(props) {
        super(props)

          this.backupForSheduler = {};

        this.state = {

          page:'1',
          openWiz3:false,
          array:[],
          hours: 12,
          minutes: 20,
          enabled: true,
          options:[{label:'Repository 1',value:'Repository 1'},{label:'Repository 2',value:'Repository 2'}],
          restored_disk_types:[{label:'Same as source',value:'Repository 1'},{label:'Repository 2',value:'Repository 2'}],
          
          nodes:[
            {
            label:"Egor1",
            value:"Egor1",
            restorePoint:"25/10/2017 10:00:29 PM",
            vmcount:"2",
            restorePointsCount:"",
            children:[
              {label:"disk111111111111111",
              value:"disk1",
              restorePoint:"3 days ago",
              vmcount:"",
              restorePointsCount:"11",
            },
            {label:"disk22222222222222",
            value:"disk2",
            name:"jobname2",
            restorePoint:"4 days ago",
            vmcount:"",
            restorePointsCount:"11"},
            {label:"disk555",
            value:"disk552",
            name:"jobnam555e2",
            restorePoint:"4 days ago",
            vmcount:"",
            restorePointsCount:"11"}
          ]}
          ,

          {
            label:"Egor12",
            value:"Egor12",
            restorePoint:"25/10/2017 10:00:29 PM",
            vmcount:"22",
            restorePointsCount:"",
            children:[
              {label:"disk111111111111111",
              value:"egorka",
              restorePoint:"2 days ago",
              vmcount:"",
              restorePointsCount:"12",
            },
            {label:"disk22222222222222",
            value:"oleg",
            name:"jobname2",
            restorePoint:"restorepoint4",
            vmcount:"",
            restorePointsCount:"12",}
          ]},

         
          ],


          checked5:false,
          checked41:false,
          selected: {},
          filteredItems: false,
          filterval: '',
         
          
          
        }
    }

    

    componentWillReceiveProps(nextProps) {

     

     }



    close() {
      this.props.close();
      this.resetData();
    }

    pagechange() {
      if (this.state.page == 1) {
        this.setState({page:2})
      }
      if (this.state.page == 2) {
        this.setState({page:3})
      }
      if (this.state.page == 3) {
        this.setState({page:4})
      }
      if (this.state.page == 4) {
        this.setState({page:5})
      }

    }

    pagechangeB() {
      if (this.state.page == 5) {
        this.setState({page:4})
      }
      if (this.state.page == 4) {
        this.setState({page:3})
      }
      if (this.state.page == 3) {
        this.setState({page:2})
      }
      if (this.state.page == 2) {
        this.setState({page:1})
      }

    }

componentDidUpdate() {

 
  $('.childtable').on('click', function(){
    $('.childtable').removeClass('selected-green-for-table');
    $(this).addClass('selected-green-for-table')

  
    });

}

componentDidMount() {

       
      }


	window1(){
    let loopArray =this.state.filteredItems || this.state.nodes ||  [];
	return(
	<div>
		<div className="zagname">Virtual Machine</div>
		<div className="pagetwoundertxt">Select Virtual Machine which disk you want to be restored.</div>
        <div className="iconboxtbsearch gt-clear">
			<div className="gt-left window1line3">StarWind plugin WEB sphere(SWMA)_(ABykovskiy)</div>
			<div className="searchiccont">
				<input value={this.state.filterval} onChange={this.filter.bind(this)} placeholder="Search" type="text"/><input type="button" className="search-icon-jh"/>
			</div>
		</div>
        <div className="consteptwo">
        <table className="standart-table">
        <thead>
          <tr>
            <th>Job name</th>
            <th>Last Restore Point</th>
            <th>VM Count</th>
            <th>Restore Points Count</th>
          </tr>
        </thead>
        
      </table>
      <div className="looper">
          
          {loopArray.map((item,index) => (
            <div className="loop-lvl1 gt-clear">
                   <div className={(item.expand) ? ('hider minus'):('hider plus')} onClick={this.hideOrShow.bind(this,item.value,item.expand)}>
                    <div className="col-4 back_upicon">{item.label}</div>
                    <div className="col-4">{item.restorePoint}</div>
                    <div className="col-4">{item.vmcount}</div>
                    <div className="col-4">{item.restorePointsCount}</div>
                   
                   </div>
                  {
                     (item.expand) ?
                      (<div className="loop-lvl2 ">
                   {item.children.map((child,index) => (

                      <div onClick={this.saveId.bind(this,child.label)} className="gt-clear childtable text-alignCenter">
                        <div className="gt-left cliptext vm-icon col-4">{child.label}</div>
                        <div className="gt-left col-4">{child.restorePoint}</div>
                        <div className="gt-left col-4">{child.vmcount}</div>
                        <div className="gt-left col-4">{child.restorePointsCount}</div>
                      </div>

                      ))}
                   </div>)
                   :
                   (null)
                   }
                   
            </div>
            ))}
          
      </div>

        </div>
	</div>
	)
  }

  saveId(val) {
    console.log(val);
  }

  hideOrShow(value,checked) {

    
  
    

    if (this.state.filteredItems) {

      let  positiveArr112 = this.state.filteredItems.map(function(item) {
        return ( (item.value == value) ? ( (checked == true) ?
         ({'label':item.label,'value':item.value,'restorePoint':item.restorePoint,'vmcount':item.vmcount,'restorePointsCount':item.restorePointsCount, 'children':item.children,'expand':false})
         :({'label':item.label,'value':item.value,'restorePoint':item.restorePoint,'vmcount':item.vmcount,'restorePointsCount':item.restorePointsCount,'children':item.children,'expand':true})
   
        )
         : ({'label':item.label,'value':item.value,'restorePoint':item.restorePoint,'vmcount':item.vmcount,'restorePointsCount':item.restorePointsCount,'children':item.children,'expand':item.expand})
       );
     });
      this.setState({filteredItems:positiveArr112})
    }
    if (!this.state.filteredItems) {

      let  positiveArr112 = this.state.nodes.map(function(item) {
        return ( (item.value == value) ? ( (checked == true) ?
         ({'label':item.label,'value':item.value,'restorePoint':item.restorePoint,'vmcount':item.vmcount,'restorePointsCount':item.restorePointsCount, 'children':item.children,'expand':false})
         :({'label':item.label,'value':item.value,'restorePoint':item.restorePoint,'vmcount':item.vmcount,'restorePointsCount':item.restorePointsCount,'children':item.children,'expand':true})
   
        )
         : ({'label':item.label,'value':item.value,'restorePoint':item.restorePoint,'vmcount':item.vmcount,'restorePointsCount':item.restorePointsCount,'children':item.children,'expand':item.expand})
       );
     });
      

      this.setState({nodes:positiveArr112})
    }
  
  
    
    }

  filter(e) {
    var value = e.target.value;
  //  if (!value) {
  //    let  positiveArr112 = this.state.nodes.map(function(item) {
    //    return ({'label':item.label,'value':item.value,'restorePoint':item.restorePoint,'vmcount':item.vmcount,'restorePointsCount':item.restorePointsCount,'children':item.children,'expand':false});
    //  });
    //  this.setState({nodes:positiveArr112});
  //  }
    this.setState({filterval: value})
    this.setState({
      filteredItems: !value
        ? false
        : this.state.nodes.map(item => ({
          ...item,
          children: item.children
            .filter(child => child.value.includes(value.toLowerCase()))
        }))
        .filter(item => item.children.length > 0)
    })
  }

	window2(){
    
	return(
    
	<div>
            <div className="zagname">Restore Point</div>
		    <div className="pagetwoundertxt">Select the desired restore point</div>
            <div className="gt-clear martop30px heigth75">
                <div className="gt-left width50">
                    <div className="gt-clear heigth25px">
                        <div className="gt-left width30">VM Name:</div>
                        <div className="gt-left width70 cliptext font600w">StarWind plugin WEB sphere(SWMA)_(ABykovskiy)</div>
                    </div>
                    <div className="gt-clear">
                        <div className="gt-left width30">VM Size:</div>
                        <div className="gt-left font600w">10.0 GB</div>
                    </div>
                </div>
                <div className="gt-right">
                        <div className="gt-left width105">Original host:</div>
                        <div className="gt-left font600w">192.168.0.1</div>
                </div>
            </div>
            <div className="consteptwo">
                 <table>
                    <thead>
                        <tr>
                         <th>Job name</th>
                          <th>Last Restore Point</th>
                          <th>VM Count</th>
                          <th>Restore Points Count</th>
                         </tr>
                     </thead>
                 </table>
            </div>


	</div>
	)

	}

    chDiskType(val) {
        this.setState({restored_disk_type:val})
    }

   


    QRollBack () {
        if( this.state.QRollBack) {
          this.setState({QRollBack:false})
        }
        if( !this.state.QRollBack) {
          this.setState({QRollBack:true})
        }
      }

    removeElem() {
        var arrDelete = this.state.array;
    
        for (var i = arrDelete.length - 1; i >= 0; i--) {
    
        if(arrDelete[i].checked == true) {
    
            arrDelete.splice(i, 1);

        }
    
        this.setState({array:arrDelete})
    }
    
        if (this.state.bigcheck) {
          this.setState({bigcheck:false})
        }
      }
    
      bigcheck(state) {
        if (state) {
        let  positiveArr112 = this.state.array.map(function(name) {
           return ({'Id':name.Id,'size':name.size,'name':name.name,'type':name.type,'checked':false} );
        });
        this.setState({array:positiveArr112,bigcheck:false})
        }
        if (!state) {
        let  positiveArr112 = this.state.array.map(function(name) {
           return ({'Id':name.Id,'size':name.size,'name':name.name,'type':name.type,'checked':true} );
        });
        this.setState({array:positiveArr112,bigcheck:true})
        }
      }
    
      tblcheck(index,checked) {
      let  positiveArr112 = this.state.array.map(function(name) {
         return ( (name.Id == index) ? ( (checked == true) ?
          ({'Id':name.Id,'size':name.size,'name':name.name,'type':name.type,'checked':false})
          :({'Id':name.Id,'size':name.size,'name':name.name,'type':name.type,'checked':true})
    
         )
          : ({'Id':name.Id,'size':name.size,'name':name.name,'type':name.type,'checked':name.checked})
        );
      });
    
    
      this.setState({array:positiveArr112})
      }

	window3(){
        var filer = this.state.filteredItems || this.state.array || [];
		return(
	<div>
        <div className="zagname">Disk Mapping</div>
		<div className="pagetwoundertxt">Map virtual disks from backup to virtual device nodes on target VM</div>
        <div className="font600w virtualMachineLabel">Virtual Machine</div>
        <div className="gt-clear heigth45">
            <input className="gt-left virtualMachineInput"/>
            <a onClick={()=> {this.setState({closeWizPRO:true})}} className="gt-left btns-browser-change btns-modifyers">Browse...</a>
            <a onClick={()=> {this.setState({closeWizPRO2:true})}} className="gt-left btns-browser-change">Change...</a>
        </div>
        <div className="consteptwo heigth270">
                 <table>
                    <thead>
                        <tr>
                         <th ><input checked={this.state.bigcheck}  onChange={this.bigcheck.bind(this,this.state.bigcheck)} type="checkbox"/>Virtual Disk</th>
                          <th>Virtual Device Node</th>
                          <th>Datastore</th>
                          
                         </tr>
                     </thead>
                     <tbody>
          {filer.map((item,index) => (
              <tr key={index}>
                <td><input checked={item.checked}  onChange={this.tblcheck.bind(this,item.Id,item.checked)} type="checkbox"/>{item.name}</td>
                <td>{item.type}</td>
                <td>{item.size} GB</td>
              </tr>

          ))}
        </tbody>
                 </table>
            </div>
        <div className="font600w restored_disk_type_label">Restored Disk type:</div>
        <Select
                      className="repo1"

                      name="form-field-name"
                      value={this.state.restored_disk_type}
                      options={this.state.restored_disk_types}
                      searchable={false}
                      onChange={this.chDiskType.bind(this)}
        />
		<div className="chwithlbl martop20px">
            <label><input type="checkbox" onChange={this.QRollBack.bind(this)} checked={this.state.QRollBack} name="dva"/> Quick rollback(restore changed blocks only)</label>
            </div>

	</div>
	)
	}

  
    handleTEXT (event) {
        this.setState({HANDLETEXT: event.target.value});
     }

	window4(){

		return(
		<div className="window4">
		 <div className="zagname">Reason</div>
		  <div className="pagetwoundertxt marnvz ">
              Type in reason for performing this restore operation.
               This information will be logged in the restore sessions history for later reference.
           </div>

		  <div className="zagname somevizstep3 martop20px">Restore reason</div>

		  <textarea value={this.state.HANDLETEXT} onChange={this.handleTEXT.bind(this)} className="someviztextarea" placeholder="Text input"></textarea>

	    </div>
			)
	}


	window5(){

		return(
		<div>
                <div className="windows-title zagname">Summary</div>
          <div className="windows-list">
            <dl className="floated">
                <dt>Original VM Name:</dt>
                <dd>[ToDo]</dd>
                <dt>Restore point:</dt>
                <dd>[ToDo] </dd>
                <dt>Target VM Name:</dt>
                <dd>[ToDo]</dd>
                <dt>Target host:</dt>
                <dd>[ToDo]</dd>
                <dt>Restore Disks:</dt>
                <dd>[ToDo]</dd>
                <dt>Target VM folder:</dt>
                <dd>[ToDo]</dd>
                <dt>Disk info:</dt>
                <dd>[ToDo]</dd>
                <dt className="dtmodificator">Source file:</dt>
                <dd>[ToDo]</dd>
                <dt className="dtmodificator2">Target store:</dt>
                <dd>[ToDo]</dd>
              </dl>
          </div>
          <div className="gt-clear">
            <div className="gt-left chwithlbl martop20px">
            
            <label><input type="checkbox" onChange={this.QRollBack.bind(this)} checked={this.state.QRollBack} name="dva"/>Power on target VM after restoring</label>
            
            </div>
            <div className="gt-right martop20px">
            <a className=" onltextbtn2">Pick proxy to use</a>
            </div>
          </div>
        </div>
		)
	}



    renderPage () {
      if (this.state.page == 1) {
        return (<div className="wizzard1">{this.window1()}</div>)
      }
      if (this.state.page == 2) {
        return (<div className="wizzard1">{this.window2()}</div>)
      }
      if (this.state.page == 3) {
        return (<div className="wizzard1">{this.window3()}</div>)
      }
      if (this.state.page == 4) {
        return (<div className="wizzard1 stage4">{this.window4()}</div>)
      }
      if (this.state.page == 5) {
        return (<div className="wizzard1">{this.window5()}</div>)
      }
    }
    switch (param) {
      this.setState({page:param})
    }

    renderBubbles() {
      return (
        <div className="width40px gt-left">
          <a onClick={this.switch.bind(this,1)} className={this.state.page == 1 || this.state.page == 2 || this.state.page == 3 || this.state.page == 4 || this.state.page == 5  ? ('bubble bubblegreen') :('bubble')}>1</a>
          <div className={ this.state.page == 2 || this.state.page == 3 || this.state.page == 4 || this.state.page == 5 ? ('line-x bubblegreen') :('line-x')}></div>

          <a onClick={this.switch.bind(this,2)} className={this.state.page == 2 || this.state.page == 3 || this.state.page == 4 || this.state.page == 5 ? ('bubble bubblegreen') :('bubble')}>2</a>
          <div className={ this.state.page == 3 || this.state.page == 4 || this.state.page == 5 ? ('line-x bubblegreen') :('line-x')}></div>

          <a onClick={this.switch.bind(this,3)} className={this.state.page == 3 || this.state.page == 4 || this.state.page == 5 ? ('bubble bubblegreen') :('bubble')}>3</a>
          <div className={ this.state.page == 4 || this.state.page == 5 ? ('line-x bubblegreen') :('line-x')}></div>

          <a onClick={this.switch.bind(this,4)} className={this.state.page == 4 || this.state.page == 5 ? ('bubble bubblegreen') :('bubble')}>4</a>
          <div className={ this.state.page == 5 ?  ('line-x bubblegreen') :('line-x')}></div>

          <a onClick={this.switch.bind(this,5)} className={this.state.page == 5 ? ('bubble bubblegreen') :('bubble')}>5</a>

        </div>
      )
    }
    renderbublenames() {
      return (
        <div className="titles-settings gt-left">

          <div className={this.state.page == 1 || this.state.page == 2 || this.state.page == 3 || this.state.page == 4 || this.state.page == 5 ? (' ') :('greyfixer34')}>Virtual <br/> Machine</div>
          <div className={ this.state.page == 2 || this.state.page == 3 || this.state.page == 4 || this.state.page == 5 ? ('mar69px') :('mar69px greyfixer34')}> Restore <br/> Point</div>
          <div className={  this.state.page == 3 || this.state.page == 4 || this.state.page == 5 ? ('mar69px') :('mar69px greyfixer34')} >Disk <br/> Mapping</div>
          <div className={ this.state.page == 4 || this.state.page == 5 ? ('mar69px') :('mar69px greyfixer34')} >Reason <br/> Schedule</div>
          <div className={  this.state.page == 5 ? ('mar56px') :('mar56px greyfixer34')}> <br/> Summary</div>
        </div>
      )
    }

    
    add () {
     
    }

    updateJob() {
      
    }

    resetData() {
      this.setState({page:1})
      this.setState({checked41:false,nameToServer:'',DescToServer:'',filteredItems:false,array:[]})
     

     
      
    }

    
    closeWizPRO() {
      this.setState({closeWizPRO:false})
    }

    closeWizPRO2() {
      this.setState({closeWizPRO2:false})
    }


    updatefirsttable2() {

    }



    render(){

      console.log(this.state.filteredItems)

        return (
          <div className="diskRestoreWizard">
            {this.props.open ?
              (
                <div className="freeze">
                  <div className="pop-up-window">
                    <div className="pop-up-header">
                      <div className="gt-left pop-up-h-title">Virtual Disk Restore Wizard</div>
                      <div className="gt-right"><a className="close-pop" onClick={this.close.bind(this)}></a></div>

                    </div>
                    <div className="body-popup gt-clear">
                    <div className="pagination-buble gt-left">
                      {this.renderBubbles()}
                      {this.renderbublenames()}

                    </div>
                    <div className="view-change gt-left">
                      {this.renderPage()}
                    </div>
                    </div>
                    <div className="btns-go-back gt-clear">
                       {this.state.page == 5 ?
                        ((this.state.editmode) ?(<a onClick={this.updateJob.bind(this)} className="go-btn gt-right go-btn-global">Edit</a>):(<a onClick={this.add.bind(this)} className="go-btn gt-right go-btn-global">Add</a>)) 
                       : (<a onClick={this.pagechange.bind(this)} className="go-btn gt-right go-btn-global">Next</a>)}
                      {this.state.page == 1 ? (null) : (<a onClick={this.pagechangeB.bind(this)} className="back-btn gt-right go-btn-global">Previous</a>)}


                    </div>
                  </div>
                </div>

              ):
              (null)}
              <SelectVirtualMachineWiz array={this.updatefirsttable2.bind(this)} open={this.state.closeWizPRO} close={this.closeWizPRO.bind(this)}/>
              <VirtualDiskProperties array={this.updatefirsttable2.bind(this)} open={this.state.closeWizPRO2} close={this.closeWizPRO2.bind(this)}/>
              </div>

        )
    }
}
const mapDispatchToProps = function(dispatch) {

    return {

     
        
        

    }
}

function mapStateToProps(state) {


    return {

    }
}
export default connect(mapStateToProps, mapDispatchToProps)(DiskRestoreWiz);