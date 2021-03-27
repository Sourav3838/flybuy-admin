/* eslint-disable no-unused-expressions */
import React, { useState, useEffect } from 'react';
import { Row, Col, Button, Divider, Card, Tabs, Tag, notification } from 'antd';
import { useParams, useHistory } from 'react-router-dom';
import Magnifier from 'react-magnifier';
import '../../App.css';
import axios from '../../axios';
import './index.css';
import { CheckCircleFilled } from '@ant-design/icons';

const ViewProducts = () => {
	const { Meta } = Card;
	let history = useHistory();
	const [productData, setProductData] = useState();
	const [previewImage, setPreviewImage] = useState('');

	const { TabPane } = Tabs;
	const { productId } = useParams();
	console.log(`productData`, productData);
	async function getProductData() {
		const req = await axios.get(`/product/${productId}`);
		if (req) {
			console.log(`data of particular product`, req?.data);
			setPreviewImage(req?.data[0]?.ImageURLOne?.url);
			setProductData(req?.data[0]);
		}
	}
	async function approveProduct() {
		const req = await axios.put(`/product/${productId}/approve`);
		if (req) {
			console.log(`data of approved product`, req);
			if (req?.data?.ok === 1) {
				notification.open({
					message: 'Great Job!',
					description: `${productData?.product_name} has been approved successfuly`,
				});
				history?.replace(`/products/all`);
			}
		}
	}
	useEffect(() => {
		getProductData();
	}, [productId]);

	return (
		<>
			<div>
				<Row gutter={[24, 12]} className="px-12">
					<Col xl={24} lg={24} md={24} sm={24} xs={24}>
						{productData && (
							<>
								<div
									className=" mt-12 shadow rounded-lg p-4 flex justify-between"
									style={{
										boxShadow: '10px 14px 18px #00ff66',
									}}
								>
									<div className="font-bold text-lg">{productData?.product_name}</div>
									<div>
										<Button
											disabled={productData?.status === 'Approved'}
											type="primary"
											onClick={() => {
												console.log(`productData`, productData);
												approveProduct();
											}}
										>
											<CheckCircleFilled /> Approve
										</Button>
									</div>
								</div>

								<div className="my-6 shadow rounded-lg">
									{productData && (
										<>
											<Row gutter={[24, 12]}>
												<Col xl={8} lg={8} md={8} sm={24} xs={24}>
													<div
														style={{
															marginTop: '10%',
															maxHeight: '500px',
															overflow: 'auto',
															paddingLeft: '10%',
														}}
														className="cardStyling"
													>
														{productData?.ImageURLOne?.secure_url && (
															<Card
																className="m-3 p-12"
																style={{ width: 300 }}
																onClick={() => {
																	setPreviewImage(
																		productData?.ImageURLOne?.secure_url
																	);
																}}
																hoverable
																cover={
																	<img
																		alt="example"
																		src={productData?.ImageURLOne?.secure_url}
																	/>
																}
															>
																<Meta title="View" />
															</Card>
														)}

														{productData?.ImageURLTwo?.url && (
															<Card
																className="m-3 p-12"
																onClick={() => {
																	setPreviewImage(productData?.ImageURLTwo?.url);
																}}
																hoverable
																style={{ width: 300 }}
																cover={
																	<img
																		alt="example"
																		src={productData?.ImageURLTwo?.url}
																	/>
																}
															>
																<Meta title="View" />
															</Card>
														)}

														{productData?.ImageURLThree?.url && (
															<Card
																className="m-3 p-12"
																onClick={() => {
																	setPreviewImage(productData?.ImageURLThree?.url);
																}}
																hoverable
																style={{ width: 300 }}
																cover={
																	<img
																		alt="example"
																		src={productData?.ImageURLThree?.url}
																	/>
																}
															>
																<Meta title="View" />
															</Card>
														)}

														{productData?.ImageURLFour?.url && (
															<Card
																className="m-3 p-12"
																onClick={() => {
																	setPreviewImage(productData?.ImageURLFour?.url);
																}}
																hoverable
																style={{ width: 300 }}
																cover={
																	<img
																		alt="example"
																		src={productData?.ImageURLFour?.url}
																	/>
																}
															>
																<Meta title="View" />
															</Card>
														)}
														{productData?.ImageURLFive?.url && (
															<Card
																className="m-3 p-12"
																onClick={() => {
																	setPreviewImage(productData?.ImageURLFive?.url);
																}}
																hoverable
																style={{ width: 300 }}
																cover={
																	<img
																		alt="example"
																		src={productData?.ImageURLFive?.url}
																	/>
																}
															>
																<Meta title="View" />
															</Card>
														)}
													</div>
												</Col>
												<Divider type="vertical" />
												<Col xl={12} lg={12} md={12} sm={24} xs={24}>
													<div className="ml-32">
														<Magnifier src={previewImage} width={'40rem'} zoomFactor={1} />
													</div>
												</Col>
											</Row>
										</>
									)}
								</div>
								<div className="my-4 shadow rounded-lg">
									<Tabs
										defaultActiveKey="Description"
										onChange={(key) => {
											console.log(key);
										}}
									>
										<TabPane tab={<span className="mx-3">Description</span>} key="Description">
											<div className="mx-4 " style={{ marginBottom: '10%' }}>
												{productData && productData?.product_description}
											</div>
										</TabPane>
										<TabPane tab={<span className="mx-3">Price</span>} key="Price">
											<div className="mx-4 " style={{ marginBottom: '10%' }}>
												INR {productData && productData?.product_price}
											</div>
										</TabPane>
										<TabPane tab={<span className="mx-3">Rating</span>} key="Rating">
											<div className="mx-4 " style={{ marginBottom: '10%' }}>
												{productData && productData?.product_rating}
											</div>
										</TabPane>
										<TabPane tab={<span className="mx-3">Category</span>} key="Category">
											<div className="mx-4 " style={{ marginBottom: '10%' }}>
												{productData &&
													productData?.product_category?.map((item) => {
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
										</TabPane>
									</Tabs>
								</div>
							</>
						)}
					</Col>
				</Row>
			</div>
		</>
	);
};

export default ViewProducts;
