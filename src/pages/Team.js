/* eslint-disable no-unused-expressions */
import React, { useState, useEffect } from 'react';
import { Row, Col, Table, Tag } from 'antd';
import '../App.css';
import axios from '../axios';

const AllUsers = () => {
	const [userList, setUserList] = useState([]);

	console.log(`userList`, userList);
	async function getUsers() {
		const req = await axios.get(`/users/all`);
		if (req) {
			setUserList(req?.data);
		}
	}
	useEffect(() => {
		getUsers();
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
										}, // click row
									};
								}}
								scroll={{ x: 400, y: 300 }}
								columns={columns}
								dataSource={userList}
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
