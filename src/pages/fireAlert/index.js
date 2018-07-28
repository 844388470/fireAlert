import Title from './header';
import Main from './main';
import Side from './sider';
import './index.css'
import React, { Component } from 'react';
import { Layout,Row,Col, } from 'antd';
const { Header } = Layout;



export default class Home extends Component {
    render () {
      return (
        <Layout>
          <Header style={{ height:'8vh',backgroundColor:'#5263CB' }}>
            <Title />
          </Header>
          <Layout style={{ height:'92vh',backgroundColor:'#fff' }}>
            <Row gutter={0} >
              <Col span={6} style={{ height:'92vh',borderRight:'1px solid #eee'}}>
                <Side />
              </Col>
              <Col span={18} style={{ height:'92vh' }}>
                <Main />
              </Col>
            </Row>
          </Layout>
        </Layout>
      )
    }
  }