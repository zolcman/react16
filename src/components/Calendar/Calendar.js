import React, { Component,  PropTypes} from 'react'
import styles from './styles.scss';
import { connect} from 'react-redux';
import { emulate } from './Action'


class Calendar extends Component {
    constructor(props) {
        super(props)

        this.bk = [];
        this.state = {

            mouseDown: '',
            switcher: true,
            switcherArr: [{
                id: 0,
                checked: 0
            }, {
                id: 1,
                checked: 0
            }, {
                id: 2,
                checked: 0
            }, {
                id: 3,
                checked: 0
            }, {
                id: 4,
                checked: 0
            }, {
                id: 5,
                checked: 0
            }, {
                id: 6,
                checked: 0
            }]

        }
    }

    componentDidMount() {
        var self = this;
        document.body.onmousedown = function() {
            self.setState({
                mouseDown: 1
            });
        }
        document.body.onmouseup = function() {
            self.setState({
                mouseDown: 0
            });
        }
        this.props.emulate();
    }


    componentWillReceiveProps(nextProps) {

        if (nextProps.data) {
            var arrData = nextProps.data;
            console.log(arrData);
            var arrData = Object.entries(arrData).filter(function([key, value]) {
                return value.length > 0;
            });

            arrData = arrData.map(function(number) {

                var fixer = number[1].map(function(gh) {
                    var jjj = [];
                    var startIndex = gh.bt / 60;
                    var endindex = (gh.et + 1) / 60;
                    for (startIndex; startIndex < endindex; startIndex++) {
                        jjj.push({
                            id: startIndex,
                            color: 'grey'
                        });
                    }
                    return (

                        [jjj]
                    );
                });
                return ([number[0], fixer]);
            });

            //  console.log(arrData);

            var kkk = [];

            for (var i = 0; i < arrData.length; i++) {
                var his = arrData[i][1];

                const __flattenReducer = (result, value, valueIndex, his) => {
                    if (value instanceof Array) {
                        return value.reduce(__flattenReducer, result);
                    } else {
                        result.push(value);
                        return result;
                    }
                };

                const flatten = function(his) {
                    if (his instanceof Array) {
                        return Array.prototype.reduce.apply(his, [__flattenReducer, []]);
                    } else {
                        throw new TypeError('Expected an array');
                    }
                }
                let hours = flatten(his);
                kkk.push({
                    day: arrData[i][0],
                    hours: hours
                });
                //   console.log(arrData[i][0])
            }

            //  let  user = JSON.stringify(arrData[1]);
            var namesArr = [{ day:'mo'}, {day:'tu'}, {day:'we'}, { day:'th'}, {day:'fr'}, {day:'sa'}, {day:'su'}];
            var defArr = [];
            var greyArr = [];
            for (var x = 0; x < 24; x++) {
                defArr.push({
                    id: x,
                    color: 'white'
                })
            }

            for (var x = 0; x < 24; x++) {
                greyArr.push({
                    id: x,
                    color: 'grey'
                })
            }

            this.setState({
                whiteArr: defArr
            });
            this.setState({
                greyArr: greyArr
            });

            for (x = 0; x < namesArr.length; x++) {
                namesArr[x].hours = defArr;
            }


            this.bk = namesArr;
            //console.log(namesArr);
            var result = []

            for (var i in kkk) {
                for (var j in namesArr) {
                    if (kkk[i].day == namesArr[j].day) {

                        var vvv = kkk[i].hours
                            .concat(namesArr[j].hours)
                            .filter((x, i, self) => self.findIndex(y => y.id === x.id) === i);
                        result.push({
                            day: kkk[i].day,
                            hours: vvv
                        })

                    }

                }
            }



            var days = new Set(["mo", "tu", "we", "th", "fr", "sa", "su"]);
            result.forEach(day => days.delete(day.day));
            days.forEach(day => result.push({
                day,
                hours: defArr
            }));


            var daystosort = ["mo", "tu", "we", "th", "fr", "sa", "su"];
            this.setState({
                daysnames: daystosort
            });
            result.sort((a, b) => daystosort.indexOf(a.day) - daystosort.indexOf(b.day));
            //  console.log(result)
            this.setState({
                looparray: result
            })
            //  this.setState({looparrayBK:result})
        }


    }

    compare(a, b) {

        var aName = a.id;
        var bName = b.id;
        return ((aName < bName) ? -1 : ((aName > bName) ? 1 : 0));

    }
    clickAdd(id, day, color) {
        let arrN = this.state.looparray;
        //  console.log(color);
        let arrG = arrN[day].hours;

        if (color == 'white') {
            arrG = arrG.filter(function(item) {
                return item.id !== id;
            });
            arrG.push({
                id: id,
                color: 'grey'
            })
            arrN[day].hours = arrG;
            this.setState({
                looparray: arrN
            })
        }

    }



    onHover(id, day, color) {

        if (this.state.mouseDown) {
            let arrN = this.state.looparray;
            //  console.log(color);
            let arrG = arrN[day].hours;

            if (color == 'white') {
                arrG = arrG.filter(function(item) {
                    return item.id !== id;
                });
                arrG.push({
                    id: id,
                    color: 'grey'
                })
                arrN[day].hours = arrG;
                this.setState({
                    looparray: arrN
                })
            }

        }

    }

    switch (ind, check) {
        this.setState({
            clickedIndex: ind
        })
        var switchArr = this.state.switcherArr;

        if (!check) {

            for (var key in switchArr) {
                if (switchArr[key].id == ind) {
                    switchArr[key].checked = 1;
                    this.setState({
                        switcherArr: switchArr
                    });
                }
            }
            let arrN = this.state.looparray;
            arrN[ind].hours = this.state.greyArr;
            this.setState({
                looparray: arrN
            });


        }
        if (check) {
            for (var key in switchArr) {
                if (switchArr[key].id == ind) {
                    switchArr[key].checked = 0;
                    this.setState({
                        switcherArr: switchArr
                    });
                }
            }
            let arrN = this.state.looparray;
            arrN[ind].hours = this.state.whiteArr;
            this.setState({
                looparray: arrN
            })


        }

    }



    clear() {

        var defArr44 = [];

        for (var x = 0; x < 24; x++) {
            defArr44.push({
                id: x,
                color: 'white'
            })
        }

        var namesArr44 = [{ day:'mo'}, {day:'tu'}, {day:'we'}, { day:'th'}, {day:'fr'}, {day:'sa'}, {day:'su'}];

        for (x = 0; x < namesArr44.length; x++) {
            namesArr44[x].hours = defArr44;
        }

        let myArr = this.state.switcherArr
        for (var key in myArr) {

            myArr[key].checked = 0;
            this.setState({
                switcherArr: myArr
            });

        }

        this.setState({
            looparray: namesArr44
        })
        //onsole.log(this.bk);
    }

    save() {
        var arrSend = {mo: {},tu: {},we: {},th: {},fr: {},sa: {},su: {}};
        var modifyArr = this.state.looparray;
        var arrin3 = [];
        var arrin2 = modifyArr.map(function(item) {
            return item.hours //item.hours.color != 'white';
        });
        for (var i = 0; i < arrin2.length; i++) {
            var clear = arrin2[i].filter(function(item) {
                return item.color == 'grey';
            });
            arrin3[i] = clear;
        }
        //var input = arrin3[2];
        var result222 = [];
        for (var p = 0; p < arrin3.length; p++) {
            var input = arrin3[p];
            result222[p] = input.reduce((acc, obj, i) => {
                if (i && input[i - 1].id === obj.id - 1) {
                    acc.last[1] = obj;
                } else {
                    acc.push(acc.last = [obj]);
                }
                return acc;
            }, []);
        }


        for (var i = 0; i < result222.length; i++) {
            var clear = result222[i].filter(function(item) {
                return item[0];
            });
            result222[i] = clear;
        }

        for (var i = 0; i < result222.length; i++) {
            var clear = result222[i].map(function(item) {
                return ((item.length == 1) ? ({
                    bt: item[0].id * 60,
                    et: item[0].id * 60 + 59
                }) : ({
                    bt: item[0].id * 60,
                    et: item[1].id * 60 - 1 + 60
                }));
            });
            result222[i] = clear;
        }



        this.result = result222;

        var mo = result222[0].map(function(item) {
            return item;
        });

        arrSend.mo = this.mapper(0);
        arrSend.tu = this.mapper(1);
        arrSend.we = this.mapper(2);
        arrSend.th = this.mapper(3);
        arrSend.fr = this.mapper(4);
        arrSend.sa = this.mapper(5);
        arrSend.su = this.mapper(6);

        var jsonData = JSON.stringify(arrSend);

        this.download(jsonData, 'test.txt', 'text/plain');

        console.log(arrSend);
        //console.log(arrSend);

    }
    mapper(day) {
        var ustal = this.result[day].map(function(item) {
            return item;
        });
        return ustal;
    };

    download(text, name, type) {
        var a = document.createElement("a");
        var file = new Blob([text], {
            type: type
        });
        a.href = URL.createObjectURL(file);
        a.download = name;
        a.click();
    }

    render(){

      var loop =  this.state.looparray ||  [];
      var switcherArr = this.state.switcherArr || [];
      var daysloop = this.state.daysnames || [];

        return (
            <div className="wrap gt-clear">
              <div className="timeline gt-clear">
                <div className="all-day-label gt-left">ALL<br/>DAY</div>
                <div className="timeline gt-left">
                  <div className="text-time gt-clear">
                    <div className="text-time-item gt-left">00:00</div>
                    <div className="text-time-item gt-left">03:00</div>
                    <div className="text-time-item gt-left">06:00</div>
                    <div className="text-time-item gt-left">09:00</div>
                    <div className="text-time-item gt-left">12:00</div>
                    <div className="text-time-item gt-left">15:00</div>
                    <div className="text-time-item gt-left">18:00</div>
                    <div className="text-time-item gt-left">21:00</div>
                  </div>
                  <div className="lines gt-clear">
                    <div className="gt-left line-item"></div>
                    <div className="gt-left line-item"></div>
                    <div className="gt-left line-item"></div>
                    <div className="gt-left line-item"></div>
                    <div className="gt-left line-item"></div>
                    <div className="gt-left line-item"></div>
                    <div className="gt-left line-item"></div>
                    <div className="gt-left line-item"></div>
                  </div>
                </div>
              </div>
              <div className="gt-clear">
              <div className="days-container gt-left">
                {daysloop.map((itembd,index) => (
                    <div className="days" key={index}>{itembd}</div>

                ))}
              </div>
              <div className="switcher-container gt-left">
                {switcherArr.map((items,index) => (
                  <div className="switcher">
                  <input onChange={this.switch.bind(this,items.id,items.checked)}
                    id={'squared'+items.id} checked={items.checked} className="gt-left labelstyle" type="checkbox"/>
                    </div>
                ))}
              </div>
              <div className="loop gt-left">
                {loop.map((item,indexer) => (
                    <div className="gt-clear " key={indexer}>
                      <div className="innerloop gt-left">
                      {item.hours.sort(this.compare).map((hour,index) => (
                          <a  onMouseOver={this.onHover.bind(this,hour.id,indexer,hour.color)}
                            onMouseDown={this.clickAdd.bind(this,hour.id,indexer,hour.color)}
                             className={"gt-left hour__item" + ' ' + hour.color }
                              key={index}></a>

                      ))}
                    </div>
                    </div>

                ))}
                <div className="btns-container">
                  <a className="gt-left" onClick={this.clear.bind(this)}> Clear </a>
                  <a className="gt-right" onClick={this.save.bind(this)}> Save </a>
                </div>
              </div>
              </div>
            </div>
        )
    }
}
const mapDispatchToProps = function(dispatch) {
    return {

        emulate: () => dispatch(emulate()),



    }
}

function mapStateToProps(state) {

//console.log(state.Reducer.emulate);
    return {
        data : state.Reducer.emulate,

    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Calendar);
