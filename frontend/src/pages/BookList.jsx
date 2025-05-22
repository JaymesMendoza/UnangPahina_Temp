import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Row, Col, Card, Button, Input, Space, App } from 'antd';
import { ShoppingCartOutlined, SearchOutlined } from '@ant-design/icons';
import { fetchBooks, searchBooks } from '../store/slices/bookSlice';
import { addToCart } from '../store/slices/cartSlice';

const { Meta } = Card;
const { Search } = Input;

const BookList = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { message } = App.useApp();
    const { books, loading, error } = useSelector((state) => state.books);
    const { user } = useSelector((state) => state.auth);

    useEffect(() => {
        dispatch(fetchBooks());
    }, [dispatch]);

    useEffect(() => {
        if (error) {
            message.error(error);
        }
    }, [error, message]);

    const handleAddToCart = (book) => {
        if (!user) {
            message.warning('Please login to add items to cart');
            navigate('/login');
            return;
        }

        dispatch(addToCart({
            userId: user._id,
            item: {
                bookId: book._id,
                title: book.title,
                price: book.price,
                quantity: 1
            }
        })).then(() => {
            message.success('Added to cart successfully');
        }).catch((error) => {
            message.error('Failed to add item to cart');
        });
    };

    const handleSearch = (value) => {
        if (value) {
            dispatch(searchBooks(value));
        } else {
            dispatch(fetchBooks());
        }
    };

    return (
        <div>
            <Space direction="vertical" size="large" style={{ width: '100%' }}>
                <Search
                    placeholder="Search books..."
                    enterButton={<SearchOutlined />}
                    size="large"
                    onSearch={handleSearch}
                    loading={loading}
                    style={{ maxWidth: 500, margin: '0 auto', display: 'block' }}
                />

                <Row gutter={[16, 16]}>
                    {books.map((book) => (
                        <Col xs={24} sm={12} md={8} lg={6} key={book._id}>
                            <Card
                                hoverable
                                cover={
                                    <img
                                        alt={book.title}
                                        src={`https://picsum.photos/300/400?random=${book._id}`}
                                        style={{ height: 300, objectFit: 'cover' }}
                                    />
                                }
                                actions={[
                                    <Button 
                                        type="link" 
                                        onClick={() => navigate(`/books/${book._id}`)}
                                    >
                                        View Details
                                    </Button>,
                                    <Button
                                        type="primary"
                                        icon={<ShoppingCartOutlined />}
                                        onClick={() => handleAddToCart(book)}
                                        disabled={book.stock === 0}
                                    >
                                        Add to Cart
                                    </Button>
                                ]}
                            >
                                <Meta
                                    title={book.title}
                                    description={
                                        <>
                                            <p>{book.author}</p>
                                            <p style={{ color: '#1890ff', fontWeight: 'bold' }}>
                                                ${book.price.toFixed(2)}
                                            </p>
                                            <p style={{ color: book.stock > 0 ? 'green' : 'red' }}>
                                                {book.stock > 0 ? `${book.stock} in stock` : 'Out of stock'}
                                            </p>
                                        </>
                                    }
                                />
                            </Card>
                        </Col>
                    ))}
                </Row>
            </Space>
        </div>
    );
};

export default BookList; 