import React, { useState, useEffect } from 'react';
import { Row, Col, Statistic } from 'antd';
import axios from '../axios';
import { ShoppingCartOutlined, UserAddOutlined } from '@ant-design/icons';

const Overview = () => {
	const [orderList, setOrderList] = useState([]);
	const [userList, setUserList] = useState([]);

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
	useEffect(() => {
		getOrders();
		getUsers();
	}, []);
	return (
		<div>
			<Row gutter={[24, 12]}>
				<Col xl={12} lg={12} md={12} sm={24} xs={24}>
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
				<Col xl={12} lg={12} md={12} sm={24} xs={24}>
					<div
						className="shadow rounded-lg p-5 w-full m-5"
						style={{
							boxShadow: '10px 14px 18px #00ff66',
						}}
					>
						<Statistic title="Total Orders" value={orderList?.length} prefix={<ShoppingCartOutlined />} />
					</div>
				</Col>
			</Row>
		</div>
	);
};

export default Overview;
