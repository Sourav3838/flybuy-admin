/* eslint-disable no-unused-expressions */
import React, { useState, useEffect, useRef } from 'react';
import {
	Row,
	Col,
	Button,
	Divider,
	Card,
	Tabs,
	Tag,
	notification,
	Modal,
	Form,
	Input,
	message,
	Collapse,
	Select,
	InputNumber,
} from 'antd';
import { useParams, useHistory } from 'react-router-dom';
import '../../App.css';
import axios from '../../axios';
import axiosAPI from 'axios';
import SignaturePad from 'react-signature-canvas';
import { CheckCircleFilled, CloseCircleOutlined } from '@ant-design/icons';

const ViewProducts = () => {
	const { Meta } = Card;
	let history = useHistory();
	const { Panel } = Collapse;
	const [form] = Form.useForm();
	const [formLocation] = Form.useForm();
	const [orderData, setOrderData] = useState();
	const [action, setAction] = useState('');
	const [actionModel, setActionModel] = useState(false);
	const signPag = React.useRef({ signature: {} });
	const onClear = (index) => signPag.current[index].clear();
	useEffect(() => {
		if (orderData) {
			form.setFieldsValue({
				category: orderData?.category,
				success_rate: orderData?.category_success_rate,
				comments: orderData?.admin_status_comment,
				location: orderData?.location,
			});
		}
	}, [orderData]);
	const { orderId } = useParams();
	console.log(`orderData`, orderData);
	async function getOrderData() {
		const req = await axios.get(`/order/${orderId}`);
		if (req) {
			console.log(`data of particular order`, req?.data);

			setOrderData(req?.data[0]);
		}
	}

	const myFunction = () => {
		setTimeout(function () {
			history.replace('/orders/all');
		}, 3000);
	};

	async function updateOrder(data) {
		const req = await axios.put(`/order/${orderId}/update`, data);
		if (req) {
			console.log(`data of updated order`, req);
			if (req?.data?.ok === 1) {
				notification.open({
					message: 'Great Job!',
					description: `Order tracking details has been updated successfuly`,
				});
				getOrderData();
			}
		}
	}

	async function verifyOrder(data) {
		const req = await axios.put(`/order/${orderId}/verify`, data);
		if (req) {
			console.log(`data of approved product`, req);
			if (req?.data?.ok === 1) {
				notification.open({
					message: 'Great Job!',
					description: `Order status has been updated successfuly`,
				});
				getOrderData();
				history.replace('/orders/all');
				if (orderData?.status === 'REJECTED') {
					message.info('You will be redirected to all orders in 3 seconds');
					myFunction();
				}
			}
		}
	}

	async function findCoordinates(data) {
		axiosAPI
			.get(
				`https://api.opencagedata.com/geocode/v1/json?q=${data?.location}&key=7d593bbbb9cb4353ab146ab74dd2ff8c`
			)
			.then((response) => {
				console.log(`response`, response);
				const { lat, lng } = response.data.results[1]?.geometry;
				const newData = {};
				newData.latitude = lat;
				newData.longitude = lng;
				newData.category = data?.category;
				newData.location = data?.location;
				newData.category_comment = data?.comments;
				newData.category_success_rate = data?.success_rate;
				updateOrder(newData);
			})
			.catch((error) => {
				console.log(error);
			});
	}

	useEffect(() => {
		getOrderData();
	}, [orderId]);

	return (
		<>
			<div>
				<Row gutter={[24, 12]} className="px-12">
					<Col xl={24} lg={24} md={24} sm={24} xs={24}>
						{orderData && (
							<>
								<div
									className=" mt-12 shadow rounded-lg p-4 flex justify-between"
									style={{
										boxShadow: '10px 14px 18px #00ff66',
									}}
								>
									<div className="font-bold text-lg">#{orderData?._id}</div>
									<div className="flex">
										<div>
											<Button
												disabled={
													orderData?.status === 'APPROVED' || orderData?.status === 'REJECTED'
												}
												type="primary"
												onClick={() => {
													// approveProduct();

													setAction('APPROVED');
													setActionModel(true);
												}}
											>
												<CheckCircleFilled /> Approve
											</Button>
										</div>
										<div className="mx-3">
											<Button
												disabled={
													orderData?.status === 'REJECTED' || orderData?.status === 'APPROVED'
												}
												type="danger"
												onClick={() => {
													// rejectProduct();
													setAction('REJECTED');
													setActionModel(true);
												}}
											>
												<CloseCircleOutlined /> Reject
											</Button>
										</div>
									</div>
								</div>

								<div className="my-4 p-4 flex bg-gray-100 justify-between">
									{orderData?.admin_status_comment && (
										<div className="flex ">
											<div className="bg-blue-800 rounded-full text-gray-100 py-1 px-4 mx-3">
												<i>i</i>
											</div>
											<div className="mx-2">{orderData?.admin_status_comment}</div>
										</div>
									)}
									<div>
										<div className="bg-green-500 rounded-full text-gray-900 py-1 px-4 mx-3">
											<i>INR</i> {orderData?.amount}
										</div>
									</div>
								</div>

								<div className="my-6 shadow rounded-lg">
									<Row gutter={[24, 12]}>
										{orderData?.productsList?.map((item) => (
											<Col xl={8} lg={8} md={8} sm={24} xs={24}>
												<Card
													className="m-3 p-12"
													style={{ width: 300, height: 300 }}
													hoverable
													cover={
														<img
															alt="example"
															src={item?.product?.ImageURLOne?.secure_url}
														/>
													}
												>
													<Meta title={item?.product?.product_name} />
												</Card>
											</Col>
										))}
									</Row>
								</div>

								{orderData?.status === 'APPROVED' && (
									<Collapse defaultActiveKey={['1']}>
										<Panel header="This is panel header 1" key="1">
											<Row gutter={[24, 12]}>
												<Col xl={24} lg={24} md={24} sm={24} xs={24}>
													<Form
														hideRequiredMark
														name="basic"
														autoComplete="off"
														form={form}
														onFinish={(values) => {
															findCoordinates(values);

															// updateOrder(data);
														}}
													>
														<Form.Item
															label={<span className="">Choose category</span>}
															name="category"
															rules={[
																{
																	required: true,
																	message: 'Please input the category!',
																},
															]}
														>
															<Select
																style={{ width: '100%' }}
																placeholder="select one categoty"
															>
																<Select.Option value="Approved">
																	<div className="demo-option-label-item">
																		Approved
																	</div>
																</Select.Option>
																<Select.Option value="Dispatched">
																	<div className="demo-option-label-item">
																		Dispatched
																	</div>
																</Select.Option>
																<Select.Option value="Delivered">
																	<div className="demo-option-label-item">
																		Delivered
																	</div>
																</Select.Option>
															</Select>
														</Form.Item>

														<Form.Item
															label={<span className="">Success rate</span>}
															name="success_rate"
															rules={[
																{
																	required: true,
																	message: 'Please input the success rate!',
																},
															]}
														>
															<InputNumber
																min="0"
																max="100"
																step="1"
																stringMode
																style={{ width: '100%' }}
																size={'large'}
															/>
														</Form.Item>

														<Form.Item
															label={<span className="">Add comments</span>}
															name="comments"
															rules={[
																{
																	required: true,
																	message: 'Please input the status comment!',
																},
															]}
														>
															<Input placeholder="Enter status comment" size={'large'} />
														</Form.Item>
														<Form.Item
															label={<span className="">Add location</span>}
															name="location"
															rules={[
																{
																	required: true,
																	message: 'Please input the status comment!',
																},
															]}
														>
															<Input placeholder="Enter status comment" size={'large'} />
														</Form.Item>

														<Form.Item>
															<Button
																type="primary"
																className="mt-4 flex"
																onClick={() => form?.submit()}
															>
																Add Tracking Info
															</Button>
														</Form.Item>
													</Form>
												</Col>
											</Row>
										</Panel>
									</Collapse>
								)}
							</>
						)}
					</Col>
				</Row>
			</div>

			<Modal
				title="Update Order Status"
				visible={actionModel}
				footer={null}
				onCancel={() => {
					form?.resetFields();
					setActionModel(false);
				}}
			>
				<Form
					hideRequiredMark
					name="basic"
					autoComplete="off"
					form={form}
					onFinish={(values) => {
						const data = {};
						data.status = action;
						data.admin_status_comment = values?.admin_status_comment;
						data.signature = signPag.current['signature'].getTrimmedCanvas().toDataURL('image/png');
						console.log(`data`, data);
						verifyOrder(data);
					}}
				>
					<Form.Item
						label={<span className="">Add comments</span>}
						name="admin_status_comment"
						rules={[
							{
								required: true,
								message: 'Please input the status comment!',
							},
						]}
					>
						<Input placeholder="Enter status comment" size={'large'} />
					</Form.Item>
					<div className="formLabel">Add Signature</div>

					<div className="w-full h-24 border my-2">
						<SignaturePad
							canvasProps={{ className: 'h-full w-full' }}
							ref={(sign) => {
								signPag.current.signature = sign;
							}}
						/>
					</div>
					<div className="flex justify-end">
						<Button onClick={() => onClear('signature')} className="px-4">
							Clear
						</Button>
					</div>
					<Form.Item>
						<Button type="primary" className="mt-4 flex" onClick={() => form?.submit()}>
							Add comments
						</Button>
					</Form.Item>
				</Form>
			</Modal>
		</>
	);
};

export default ViewProducts;
