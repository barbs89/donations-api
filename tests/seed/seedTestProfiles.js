
const profiles = [
	{
		id: "78afca18-8162-4ed5-9a7b-212b98c9ec87",
		name: "Campaign Profile",
		total: 0,
		parentId: null,
		currency: "AUD"
	},
	{
		id: "bb7fcf22-2c1e-4c63-8110-a19234401460",
		name: "Another Campaign Profile",
		total: 0,
		parentId: null,
		currency: "USD"
	},
	{
		id: "2ad19172-9683-407d-9732-8397d58ddcb2",
		name: "Nick's Fundraising Profile",
		total: 0,
		parentId: "78afca18-8162-4ed5-9a7b-212b98c9ec87",
		currency: "AUD"
	},
	{
		id: "f1efabfb-1e5b-4aad-89b7-517abedc117e",
		name: "Amy's Fundraising Profile",
		total: 0,
		parentId: "bb7fcf22-2c1e-4c63-8110-a19234401460",
		currency: "USD"
	}
];

module.exports = { profiles };