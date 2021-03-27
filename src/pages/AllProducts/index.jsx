/* eslint-disable no-unused-expressions */
import React, { useState, useEffect } from 'react';
import { Row, Col, Input, Table, Tag, Space } from 'antd';
import { useHistory } from 'react-router-dom';
import '../../App.css';
import axios from '../../axios';
import { EyeTwoTone } from '@ant-design/icons';

const AllProducts = () => {
	const [productList, setProductList] = useState([]);
	console.log(`productList`, productList);
	async function getProducts() {
		const req = await axios.get('/product/all');
		if (req) {
			setProductList(req?.data);
		}
	}
	useEffect(() => {
		getProducts();
	}, []);
	let history = useHistory();
	const columns = [
		{
			title: 'Product Name',
			dataIndex: 'product_name',
			render: (text, record) => (
				<div
					onClick={() => {
						history?.replace(`/products/view/${record?._id}`);
					}}
					className="underline text-blue-400"
				>
					{text}
				</div>
			),
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
						onClick={() => {
							history?.replace(`/products/view/${record?._id}`);
						}}
					>
						<EyeTwoTone /> View
					</div>
				</Space>
			),
		},
	];

	return (
		<>
			<div>
				<Row gutter={[24, 12]} className="px-12">
					<Col span={4} />
					<Col xl={18} lg={18} md={18} sm={24} xs={24}>
						<div className=" mt-12 shadow rounded-lg p-4">
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
								dataSource={productList}
							/>
						</div>
					</Col>
					<Col span={2} />
				</Row>
			</div>
		</>
	);
};

export default AllProducts;
