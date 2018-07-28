import React, { Component } from 'react';
import { Card } from 'antd';
import { connect } from 'react-redux';



class Sider extends Component {
    constructor(){
        super()
        this.state={
            equNum:'0',
            equAdd:'0',
            policeNum:'0',
            policeAdd:'0',
            faultNum:'0',
            faultAdd:'0'
        }
    }

    // componentDidMount() {
    //     this.timerID = setInterval(
    //         () => this.tick(),
    //     1000);
    // }
    
    // componentWillUnmount() {
    //     clearInterval(this.timerID);
    // }
    
    // tick() {
    //     this.setState({
    //         date: new Date()
    //     });
    // }
    

    render () {
      return (
        <div style={{ backgroundColor:'#fff',padding:'30px' }} className='content'>
            <h3 style={{ backgroundColor:'#fff',marginBottom:'20px',fontWeight:'bold',lineHeight:'39px' }}>统计</h3>
            <Card title="设备数量" extra={`${this.props.fireData.list.length}`} style={{ marginBottom: '20px' }}>
                <p>本月新增: <span>{this.props.fireData.equAdd}</span></p>
            </Card>
            <Card title="报警次数" extra={`${this.props.fireData.policeNum}`} style={{ marginBottom: '20px' }}>
                <p>今日新增: <span>{this.props.fireData.policeAdd}</span></p>
            </Card>
            {/* <Card title="故障次数" extra={this.state.faultNum} style={{ marginBottom: '20px' }}>
                <p>今日新增: <span>{this.state.faultAdd}</span></p>
            </Card> */}
        </div>
      )
    }
  }

  const mapStateToProps = (state) => {
    return {
      fireData: state.fireData
    }
  }

Sider = connect(mapStateToProps)(Sider)


export default Sider;
