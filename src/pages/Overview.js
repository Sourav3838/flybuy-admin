import React, { useState, useEffect } from 'react';
import { Row, Col, Statistic } from 'antd';
import axios from '../axios';
import { ShoppingCartOutlined, SlidersOutlined, UserAddOutlined } from '@ant-design/icons';

const Overview = () => {
	const [orderList, setOrderList] = useState([]);
	const [userList, setUserList] = useState([]);
	const [retailerList, setRetailerList] = useState([]);

	async function getOrders() {
		const req = await axios.get(`/orders/all`);
		if (req) {
			setOrderList(req?.data);
		}
	}

	async function getUsers() {
		const req = await axios.get(`/users/all`);
		if (req) {
			setUserList(req?.data);
		}
	}

	async function getRetailers() {
		const req = await axios.get(`/retailers/all`);
		if (req) {
			setRetailerList(req?.data);
		}
	}
	useEffect(() => {
		getOrders();
		getUsers();
		getRetailers();
	}, []);
	return (
		<div>
			<Row gutter={[24, 12]}>
				<Col xl={8} lg={8} md={8} sm={24} xs={24}>
					<div
						className="shadow rounded-lg p-5 w-full m-5"
						style={{
							boxShadow: '10px 14px 18px #00ff66',
						}}
					>
						<Statistic
							className="w-full p-5"
							title="Total Users"
							value={userList?.length}
							prefix={<UserAddOutlined />}
						/>
					</div>
				</Col>
				<Col xl={8} lg={8} md={8} sm={24} xs={24}>
					<div
						className="shadow rounded-lg p-5 w-full m-5"
						style={{
							boxShadow: '10px 14px 18px #00ff66',
						}}
					>
						<Statistic title="Total Orders" value={orderList?.length} prefix={<ShoppingCartOutlined />} />
					</div>
				</Col>
				<Col xl={8} lg={8} md={8} sm={24} xs={24}>
					<div
						className="shadow rounded-lg p-5 w-full m-5"
						style={{
							boxShadow: '10px 14px 18px #00ff66',
						}}
					>
						<Statistic title="Total Retailers" value={retailerList?.length} prefix={<SlidersOutlined />} />
					</div>
				</Col>
			</Row>
		</div>
	);
};

export default Overview;
