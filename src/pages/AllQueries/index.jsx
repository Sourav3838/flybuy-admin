/* eslint-disable no-unused-expressions */
import React, { useState, useEffect } from 'react';
import classNames from 'classnames';
import { Row, Col, Input, message, Table, Modal, Space, Button, Form } from 'antd';
import '../../App.css';
import axios from '../../axios';

const AllQueries = () => {
	const [queryList, setQueryList] = useState([]);
	const [displayQueryModel, setDisplayQueryModel] = useState(false);
	const [displayQuery, setDisplayQuery] = useState('');
	console.log(`queryList`, queryList);
	const [form] = Form?.useForm();
	async function getQueries() {
		const req = await axios.get(`/query/all`);
		if (req) {
			setQueryList(req?.data);
		}
	}
	useEffect(() => {
		getQueries();
	}, []);
	useEffect(() => {
		if (displayQuery?.status !== 'Open') {
			form?.setFieldsValue({
				query: displayQuery?.admin_comment,
			});
		}
	}, [displayQuery]);
	const columns = [
		{
			title: 'Query Id',
			dataIndex: '_id',
			render: (text) => <div className="w-full"># {text}</div>,
		},
		{
			title: 'Category',
			render: () => <div>Personal</div>,
		},
		{
			title: 'Status',
			dataIndex: 'status',
			render: (text) => <div> {text || '-'}</div>,
		},
		{
			title: 'Description',
			dataIndex: 'query',
			render: (data) => <div className="w-full flex">{data?.fields?.query?.stringValue}</div>,
		},
		{
			key: 'action',
			align: 'right',
			render: (_, record) => (
				<Space size="middle">
					<Button
						onClick={() => {
							setDisplayQuery(record);
							setDisplayQueryModel(true);
						}}
						type="primary"
					>
						{record?.status === 'Open' ? 'Resolve' : 'View'}
					</Button>
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
							<Table scroll={{ x: 400, y: 300 }} columns={columns} dataSource={queryList} />
						</div>
					</Col>
					<Col span={2} />
				</Row>
			</div>
			<Modal
				title="User Query"
				visible={displayQueryModel}
				onCancel={() => {
					setDisplayQueryModel(false);
				}}
				footer={null}
			>
				<div className="font-bold">{displayQuery?.query?.fields?.query?.stringValue}</div>
				<div className="flex mb-6">
					<div className="bg-blue-500 rounded-full px-2 mr-2">Personal</div>
					<div
						className={classNames(
							displayQuery?.status === 'Open' ? 'bg-yellow-500' : 'bg-green-500',
							'rounded-full px-2'
						)}
					>
						{displayQuery?.status}
					</div>
				</div>
				<Form
					hideRequiredMark
					name="basic"
					form={form}
					onFinish={(values) => {
						async function resolveQuery() {
							const req = await axios.put(`/query/${displayQuery?._id}/close`, {
								comment: values?.query,
							});
							if (req) {
								message.success('Query has been resolved');
								setDisplayQueryModel(false);
								form?.resetFields();
								getQueries();
							}
						}
						resolveQuery();
					}}
				>
					<Form.Item name="query">
						<Input placeholder="your query resolved by admin" disabled={displayQuery?.status !== 'Open'} />
					</Form.Item>
					{displayQuery?.status === 'Open' && (
						<Form.Item name="btn">
							<Button onClick={() => form?.submit()}>Resolve</Button>
						</Form.Item>
					)}
				</Form>
			</Modal>
		</>
	);
};

export default AllQueries;
