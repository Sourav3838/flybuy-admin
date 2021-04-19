/* eslint-disable no-unused-expressions */
import React, { useState, useEffect } from 'react';
import { Row, Col, Table, Tag } from 'antd';
import { useHistory } from 'react-router-dom';
import '../../App.css';
import axios from '../../axios';

const AllUsers = () => {
	const history = useHistory();
	const [retailerList, setRetailerList] = useState([]);

	console.log(`retailerList`, retailerList);
	async function getRetailers() {
		const req = await axios.get(`/retailers/all`);
		if (req) {
			setRetailerList(req?.data);
		}
	}
	useEffect(() => {
		getRetailers();
	}, []);

	const columns = [
		{
			title: 'Id',
			dataIndex: '_id',
			render: (text) => <div className="w-full"># {text}</div>,
		},
		{
			title: 'First name',
			dataIndex: 'first_name',
			render: (text) => <div>{text}</div>,
		},
		{
			title: 'Last name',
			dataIndex: 'last_name',
			render: (text) => <div> {text || '-'}</div>,
		},
		{
			title: 'Username',
			dataIndex: 'username',
			render: (text) => <div className="underline text-blue-700 cursor-pointer"> {text || '-'}</div>,
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
											history.replace(`/retailer/${record?._id}`);
										}, // click row
									};
								}}
								scroll={{ x: 400, y: 300 }}
								columns={columns}
								dataSource={retailerList}
							/>
						</div>
					</Col>
					<Col span={2} />
				</Row>
			</div>
		</>
	);
};

export default AllUsers;
