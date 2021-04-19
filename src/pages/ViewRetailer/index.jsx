import React, { useState, useEffect } from 'react';
import { Row, Col, Tag, Space, Table } from 'antd';
import axios from '../../axios';
import { useParams, useHistory } from 'react-router-dom';
import { EyeTwoTone } from '@ant-design/icons';

const ViewRetailer = () => {
	const { retailerId } = useParams();
	const history = useHistory();
	const [retailerData, setRetailerData] = useState();
	const [productRetailerList, setProductRetailerList] = useState();

	async function getRetailerProducts() {
		const req = await axios.get(`/product/all/retailer/${retailerId}`);
		if (req) {
			console.log(`req retailer data`, req);
			setProductRetailerList(req?.data);
		}
	}
	async function getRetailer() {
		const req = await axios.get(`/retailer/${retailerId}`);
		if (req) {
			console.log(`req jjjjjjjjjjjjjjjjjjjjjjj`, req);
			setRetailerData(req?.data);
			getRetailerProducts();
		}
	}

	useEffect(() => {
		getRetailer();
	}, [retailerId]);
	const columns = [
		{
			title: 'Product Name',
			dataIndex: 'product_name',
			render: (text, record) => <div className="underline text-blue-400">{text}</div>,
		},
		{
			title: 'Price',
			dataIndex: 'product_price',
			render: (text) => <div>$ {text}</div>,
		},
		{
			title: 'Rating',
			dataIndex: 'product_rating',
			render: (text) => <div> {text}</div>,
		},
		{
			title: 'Status',
			dataIndex: 'status',
			render: (text) => <div> {text}</div>,
		},
		{
			title: 'Category',
			dataIndex: 'product_category',
			render: (category) => (
				<div className="w-full flex">
					{category.map((item) => {
						let color = item.length === 5 ? 'geekblue' : 'green';
						if (item === 'Children') {
							color = 'volcano';
						}
						if (item === 'Home Accessories') {
							color = 'Yellow';
						}
						return (
							<Tag color={color} key={item}>
								{item.toUpperCase()}
							</Tag>
						);
					})}
				</div>
			),
		},
		{
			key: 'action',
			align: 'right',
			render: (text, record) => (
				<Space size="middle">
					<div
						className="text-blue-400 cursor-pointer"
						onClick={() => history.replace(`/products/view/${record._id}`)}
					>
						<EyeTwoTone /> View
					</div>
				</Space>
			),
		},
	];

	console.log(`retailerData`, retailerData);
	return (
		<div>
			<Row gutter={[24, 12]} className="px-12 mt-12">
				<Col xl={8} lg={8} md={8} sm={24} xs={24}>
					{retailerData && (
						<div className="p-2 bg-gray-100 rounded shadow">
							<div>Name:- {retailerData[0]?.first_name + ' ' + retailerData[0]?.last_name}</div>
							<div>Plan:- {retailerData[0]?.plan}</div>
							<div>Price:- {retailerData[0]?.price}</div>
						</div>
					)}
				</Col>
				<Col xl={16} lg={16} md={16} sm={24} xs={24}>
					{productRetailerList && (
						<div className="shadow rounded-lg p-4">
							<Table
								onRow={(record, rowIndex) => {
									return {
										onClick: () => {
											console.log('record', record);
										}, // click row
									};
								}}
								scroll={{ x: 400, y: 300 }}
								columns={columns}
								dataSource={productRetailerList}
							/>
						</div>
					)}
				</Col>
			</Row>
		</div>
	);
};

export default ViewRetailer;
