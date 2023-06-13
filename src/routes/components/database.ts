type Product = {
	imgUrl: string;
	name: string;
	desc: string;
};

type ProductsArray = Product[];

type DATABASE = {
	products: ProductsArray;
};

const DB: DATABASE = {
	products: [
		{
			imgUrl: '',
			name: 'Circuit Breakers',
			desc: 'Introducing our high-quality circuit breakers, designed to protect your electrical system from overloads and short circuits. Our circuit breakers are made from durable materials and feature a reliable trip mechanism, ensuring that your electrical system remains safe and secure. Our circuit breakers are available in a range of sizes and amperage ratings, making them suitable for a variety of applications, from residential to commercial and industrial. They are easy to install and operate, with a user-friendly design that makes them accessible to both professionals and DIY enthusiasts. Our circuit breakers meet industry standards for safety and reliability, and come with a warranty for your peace of mind. They are tested rigorously to ensure that they can withstand even the most challenging conditions, making them the perfect choice for any electrical system. Choose our circuit breakers for peace of mind, knowing that your electrical system is protected by the best quality components on the market. Contact us today to learn more about our circuit breakers and how they can benefit your system.'
		},
		{
			imgUrl: '',
			name: 'Circuit Breakers',
			desc: 'Introducing our high-quality circuit breakers, designed to protect your electrical system from overloads and short circuits. Our circuit breakers are made from durable materials and feature a reliable trip mechanism, ensuring that your electrical system remains safe and secure. Our circuit breakers are available in a range of sizes and amperage ratings, making them suitable for a variety of applications, from residential to commercial and industrial. They are easy to install and operate, with a user-friendly design that makes them accessible to both professionals and DIY enthusiasts. Our circuit breakers meet industry standards for safety and reliability, and come with a warranty for your peace of mind. They are tested rigorously to ensure that they can withstand even the most challenging conditions, making them the perfect choice for any electrical system. Choose our circuit breakers for peace of mind, knowing that your electrical system is protected by the best quality components on the market. Contact us today to learn more about our circuit breakers and how they can benefit your system.'
		}
	]
};

export default DB;
