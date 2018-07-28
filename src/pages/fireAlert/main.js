import React, { Component } from 'react';
import { Form, Select, Input, Button,Table,Modal,Pagination,notification,Spin  } from 'antd';
// import zh_CN from 'antd/lib/locale-provider/zh_CN';
import io from 'socket.io-client';
import { connect } from 'react-redux';

const Option = Select.Option;
const FormItem = Form.Item;

// import { connect } from 'react-redux';
// import PropTypes from 'prop-types';
// import action from '@/redux/actions';
// import store from '@/redux/store';

let list=[
    {
        key: '1',
        fireTime: '2018-07-29 22:10:29',
        equSn: '862174031402050',
        name: '深圳展会烟感报警器',
        startTime:'2018-07-02 18:27:22',
        index:'广东/深圳/福田区',
        fireState:'工作中',
        operation:true
    },
    {
        key: '2',
        fireTime: '2018-06-01 13:12:10',
        equSn: '666399',
        name: '之星科技',
        index:'上海/上海/闸北区',
        startTime:'2018-05-01 20:30:19',
        fireState:'工作中',
        operation:true
    },
    {
        key: '3',
        fireTime: '2018-06-19 15:16:29',
        equSn: 'company10-01',
        name: '中移',
        index:'北京/北京/西城区',
        startTime:'2018-01-02 16:57:20',
        fireState:'工作中',
        operation:false
    },
    {
        key: '4',
        fireTime: '2018-03-22 13:58:38',
        startTime:'2018-02-02 08:00:00',
        equSn: 'company10-02',
        name: '深建',
        index:'安徽/蚌埠/东市区',
        fireState:'停止',
        operation:true
    },
    {
        key: '5',
        fireTime: '-',
        startTime:'2017-12-02 09:00:00',
        equSn: 'sn20180115',
        name: '称超长页',
        index:'上海/上海/长宁区',
        fireState:'工作中',
        operation:false
    },
    {
        key: '6',
        fireTime: '2018-06-12 15:16:29',
        startTime:'2018-06-02 10:03:17',
        equSn: '761281135492105',
        name: '阿斯达',
        index:'广东/广州/东山区',
        fireState:'工作中',
        operation:false
    },
    {
        key: '7',
        fireTime: '2018-01-01 19:16:52',
        startTime:'2017-12-29 14:22:33',
        equSn: '794512543847810',
        name: '鲁冰花',
        index:'广西/南宁/兴宁',
        fireState:'工作中',
        operation:false
    },
    {
        key: '8',
        fireTime: '2018-01-22 10:00:13',
        startTime:'2018-01-22 09:25:31',
        equSn: '845153431205848',
        name: '聚合贵',
        index:'山东/济南/市中市',
        fireState:'停止',
        operation:false
    },
    {
        key: '9',
        fireTime: '-',
        startTime:'2018-02-02 16:50:30',
        equSn: '791131546748798',
        name: '卡盟',
        index:'浙江/杭州/上城区',
        fireState:'工作中',
        operation:false
    },
    {
        key: '10',
        fireTime: '2018-04-04 10:35:29',
        startTime:'2018-04-04 10:28:50',
        equSn: '841613454134545',
        name: '满江红',
        index:'北京/北京/朝阳区',
        fireState:'工作中',
        operation:false
    },
    {
        key: '11',
        fireTime: '2018-05-19 11:16:21',
        startTime:'2018-03-03 07:00:00',
        equSn: 'H20180125',
        name: '欧冠旗舰',
        index:'福建/福州/鼓楼区',
        fireState:'工作中',
        operation:false
    }
]



class Content extends Component {
    // static contextTypes = {
    //     colorReducer: PropTypes.object
    // }

    constructor () {
        super()
        this.state = { 
            value: '1',
            values:'',
            visible:false,
            editvisible:false,
            addloading:false,
            editloading:false,
            chaxunloading:false,
            pageValue: '1',
            pageValues:'',
            pageTotal:0,
            pageSize:10,
            pageCurrent:1,
            list:[]
        }
        this.index=-1
        this.time=null
        this.columns  = [
            {
                title: '主机SN',
                dataIndex: 'equSn',
            }, {
                title: '设备名称',
                dataIndex: 'name',
            }, {
                title: '设备位置',
                dataIndex: 'index',
            }, {
                title: '报警状态',
                dataIndex: 'fireState',
            },{
                title: '报警时间',
                dataIndex: 'fireTime',
            },{
                title: '操作',
                dataIndex: 'operation',
                render: (...a) => (
                    <span>
                        <Button onClick={this.editEqu.bind(this, a[1].key,a[1])}  type="primary" style={{marginRight:'10px',padding:'0 5px',lineHeight:'30px'}}>编辑</Button>
                        {/* {a[0] ? (
                            <span>已禁音</span>
                        ) : (
                        <Button onClick={this.setJinyin.bind(this,a[2])}  style={{padding:'0 5px',lineHeight:'30px'}}>设置静音</Button>
                        )} */}
                    </span>
                ),
            }
        ];
    }


    componentDidMount() {
        // axios({
        //     method:"POST",
        //     url:'http://localhost:9090',
        //     data:{
        //         firstName:"Fred",
        //         lastName:"Flintstone"
        //     }
        // }).then(res=>{
        //     console.log('res',res)
        // }).catch(err=>{
        //     console.log(err)
        // })
        this.websocket()
        this.first()
    }

    first=()=>{
        this.setState({
            chaxunloading:true
        })
        setTimeout(() => {
            this.props.changeList(list)
            this.props.changeEqu(1)
            this.props.changeNum(233)
            this.setState({
                chaxunloading:false,
                list:this.props.fireData.list.slice(0,10),
                pageTotal:this.props.fireData.list.length
            })
        }, 2000);
    }

    websocket=()=>{
        const socket = io.connect('https://api.rinlink.com');

        socket.on('GN201D-Warning', msg => {
        //监听事件
            if(msg&&msg.DeviceStatus){
                notification['error']({
                    message: msg.DeviceStatus==17?'烟雾报警':msg.DeviceStatus==23?'按键报警':'',
                    description: '深圳展会烟感报警器---提示报警',
                });
                this.props.changeAdd(this.props.fireData.policeAdd+1)
                this.props.changeNum(this.props.fireData.policeNum+1)

                const [...list]=this.state.list
                const [...lists]=this.props.fireData.list
                list.filter((obj)=>obj.key=='1').forEach((data)=>{data.fireState='报警中';data.fireTime=`${new Date().toLocaleDateString().replace(/\//g,'-')} ${new Date().toTimeString().slice(0,8)}`})
                lists.fireState='报警中'
                this.props.changeList(lists)

            }else{
                const [...list]=this.state.list
                const [...lists]=this.props.fireData.list
                list.filter((obj)=>obj.key=='1').forEach((data)=>{data.fireState='工作中'})
                lists.fireState='工作中'
                this.props.changeList(lists)
            }
        });

        socket.emit('GN201D-Warning', 123);
    }

    setTime=()=>{
        setTimeout(() => {
            notification['error']({
                message: '警告',
                description: '设备XXXXX报警',
            });
            this.setTime()
        }, 60000);
    }

    handleChange = (e) => {                         //查询输入
        this.setState({values: e.target.value});
    }

    radioChange = (value) => {                      //查询选择
        this.setState({value: value});
    }

    chaxun=()=>{                                    //查询
        this.setState({
            pageValues:this.state.values,
            pageCurrent:1,
        })
        this.getList()
    }

    addEqu = () =>{                                 //打开新增
        this.props.form.setFieldsValue({
            'equName':'',
            'equIndex':'',
            'equSn':'',
        })
        this.setState({
            visible:true
        })
    }

    onCancel=()=>{                                  //关闭新增
        if(this.state.addloading){
            return 
        }
        this.setState({
            visible:false
        })
    }

    onCreate=()=>{                                  //新增确认
        this.props.form.validateFields(['equName','equIndex','equSn'],(err,value)=>{
            if(!err){
                const [...list] =this.props.fireData.list
                list.push({
                    key: `${Number(list[list.length-1].key)+1}`,
                    fireTime: '-',
                    startTime:`${new Date().toLocaleDateString().replace(/\//g,'-')} ${new Date().toTimeString().slice(0,8)}`,
                    equSn: value.equSn,
                    name: value.equName,
                    index:value.equIndex,
                    fireState:'工作中',
                    operation:false
                })
                this.setState({
                    addloading:true
                })
                setTimeout(() => {
                    this.props.changeList(list)
                    this.props.changeEqu(this.props.fireData.equAdd+1)
                    let firelist=[]
                    let quan=[]
                    quan=list.filter((obj)=>obj.name.indexOf(this.state.pageValues)!==-1)
                    firelist=quan.slice(Number(this.state.pageSize)*(Number(this.state.pageCurrent)-1),Number(this.state.pageSize)*Number(this.state.pageCurrent))
                    this.setState({
                        visible:false,
                        addloading:false,
                        list:firelist,
                        pageTotal:quan.length || 0, 
                    })
                }, 3000);
            }
        })
    }

    editEqu = (index,obj) =>{                       //打开修改
        this.index=index
        this.props.form.setFieldsValue({
            'editName':obj.name,
            'editIndex':obj.index,
            'editSn':obj.equSn,
            'editTime':obj.startTime
        })
        this.setState({
            editvisible:true
        })
    }

    editCancel=()=>{                                //关闭修改
        if(this.state.editloading){
            return 
        }
        this.setState({
            editvisible:false
        })
    }

    editCreate=()=>{                                //修改确认
        this.props.form.validateFields(['editName','editIndex'],(err,obj)=>{
            if(!err){
                const [...list] =this.props.fireData.list
                this.setState({
                    editloading:true
                })
                setTimeout(() => {
                    list[this.index-1].name=obj.editName
                    list[this.index-1].index=obj.editIndex
                    this.props.changeList(list)
                    let firelist=[]
                    let quan=[]
                    quan=list.filter((obj)=>obj.name.indexOf(this.state.pageValues)!==-1)
                    firelist=quan.slice(Number(this.state.pageSize)*(Number(this.state.pageCurrent)-1),Number(this.state.pageSize)*Number(this.state.pageCurrent))
                    this.setState({
                        editvisible:false,
                        editloading:false,
                        list:firelist,
                        pageTotal:quan.length || 0, 
                    })
                }, 3000);
            }
        })
    }

    setJinyin=(index)=>{                            //修改确认
        const [...list] =this.state.list
        list[index].operation=true
        this.setState({
            list:list,
        })
    }

    onShowSizeChange=(...size)=>{                   //切换一页数量
        this.setState({
            pageCurrent:1,
            pageSize:size[1]
        })
        this.getList()
    }

    pageChange =(page) =>{                          //切换页数
        this.setState({
            pageCurrent:page
        })
        this.getList()
    }

    getList = () => {                               //请求列表
        this.setState({
            chaxunloading:true
        })
        setTimeout(() => {
            let [...list]=this.props.fireData.list
            let firelist=[]
            let quan=[]
            quan=list.filter((obj)=>obj.name.indexOf(this.state.pageValues)!==-1)
            firelist=quan.slice(Number(this.state.pageSize)*(Number(this.state.pageCurrent)-1),Number(this.state.pageSize)*Number(this.state.pageCurrent))
            this.setState({
                chaxunloading:false,
                list:firelist,
                pageTotal:quan.length || 0, 
            })
        }, 3000);
    }

    render () {
        const {getFieldDecorator}=this.props.form
        return (
        <div style={{ backgroundColor:'#fff',padding:'30px' }}>
            <Modal
                visible={this.state.visible}
                title="添加设备"
                okText="确认"
                onCancel={this.onCancel}
                footer={[
                    <Button key="back" onClick={this.onCancel} disabled={this.state.addloading}>取消</Button>,
                    <Button key="submit" type="primary" loading={this.state.addloading} onClick={this.onCreate}>
                    确认
                    </Button>,
                ]}
                >
                <Form layout="vertical">
                    <FormItem label="设备名称">
                    {getFieldDecorator('equName', {
                        rules: [{ required: true, message: '请输入设备名称' }],
                    })( <Input /> )}
                    </FormItem>
                    <FormItem label="设备位置">
                    {getFieldDecorator('equIndex', {
                        rules: [{ required: true, message: '请输入设备位置' }],
                    })(<Input />)}
                    </FormItem>
                    <FormItem label="设备SN">
                    {getFieldDecorator('equSn', {
                        rules: [{ required: true, message: '请输入设备SN' }],
                    })(<Input />)}
                    </FormItem>
                </Form>
            </Modal>
            <Modal
                visible={this.state.editvisible}
                title="修改信息"
                okText="确认"
                onCancel={this.editCancel}
                footer={[
                    <Button key="back" onClick={this.editCancel} disabled={this.state.editloading}>取消</Button>,
                    <Button key="submit" type="primary" loading={this.state.editloading} onClick={this.editCreate}>
                    确认
                    </Button>,
                ]}
                >
                <Form layout="vertical">
                    <FormItem label="设备名称">
                    {getFieldDecorator('editName', {
                        rules: [{ required: true, message: '请输入设备名称' }],
                    })( <Input /> )}
                    </FormItem>
                    <FormItem label="设备位置">
                    {getFieldDecorator('editIndex', {
                        rules: [{ required: true, message: '请输入设备位置' }],
                    })(<Input />)}
                    </FormItem>
                    <FormItem label="设备SN">
                    {getFieldDecorator('editSn')(<Input disabled={true}/>)}
                    </FormItem>
                    <FormItem label="装机时间">
                    {getFieldDecorator('editTime')(<Input disabled={true}/>)}
                    </FormItem>
                </Form>
            </Modal>
            <Form layout="inline">
                <FormItem >
                    <Input  placeholder="设备名称"  onChange={this.handleChange} value={this.state.values} style={{ width: '180px' }} disabled={this.state.chaxunloading}/>
                </FormItem>
                {/* <FormItem >
                    <Select value={this.state.value} onChange={this.radioChange} style={{ width: '180px' }} disabled={this.state.chaxunloading}>
                        <Option value="1">全部</Option>
                        <Option value="2">工作</Option>
                        <Option value="3">报警</Option>
                        <Option value="4">故障</Option>
                    </Select>
                </FormItem> */}
                <FormItem>
                    <Button type="primary"  disabled={this.state.chaxunloading}  onClick={this.chaxun}>
                        查询
                    </Button>
                </FormItem>
                <FormItem>
                    <Button type="primary" onClick={this.addEqu} disabled={this.state.chaxunloading}>
                        添加设备
                    </Button>
                </FormItem>
            </Form>
            <Table dataSource={this.state.list}  columns={this.columns}  style={{ marginTop: '20px',marginBottom:'20px' }} pagination={false} loading={this.state.chaxunloading}/>
            {/* <LocaleProvider locale={zh_CN}> */}
                <Spin  spinning={this.state.chaxunloading} indicator={<span></span>}>
                    <Pagination showSizeChanger  hideOnSinglePage={this.state.list.length<1&&this.state.pageTotal<1} current={this.state.pageCurrent} pageSize={this.state.pageSize} total={this.state.pageTotal} onShowSizeChange={this.onShowSizeChange} onChange={this.pageChange}/>
                </Spin>
            {/* </LocaleProvider> */}
        </div>
        )
    }
}


Content = Form.create()(Content);

const mapStateToProps = (state) => {
    return {
        fireData: state.fireData
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        changeList: (list) => {
            dispatch({
                type: 'ADD_LIST',
                list: list
            })
        },
        changeEqu: (equAdd) => {
            dispatch({
                type: 'ADD_EQU',
                equAdd: equAdd
            })
        },
        changeNum: (policeNum) => {
            dispatch({
                type: 'POLICE_NUM',
                policeNum: policeNum
            })
        },
        changeAdd: (policeAdd) => {
            dispatch({
                type: 'POLICE_ADD',
                policeAdd: policeAdd
            })
        }
    }
}
Content = connect(mapStateToProps,mapDispatchToProps)(Content)


export default Content;