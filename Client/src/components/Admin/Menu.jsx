import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { GrSquare } from "react-icons/gr";
import { FaToggleOff, FaToggleOn } from "react-icons/fa6";
import { Link } from 'react-router-dom';
import { useFetchCategoriesQuery, useUpdateCategoryStatusMutation } from '../../services/categoryApi'; // Adjust the import path

const Menu = () => {
    const [categories, setCategories] = useState([]);
    const [menuItems, setMenuItems] = useState([]);
    const [categoryState, setCategoryState] = useState([]); 

    const { data: fetchedCategories, error: fetchError } = useFetchCategoriesQuery();
    const [updateCategoryStatus] = useUpdateCategoryStatusMutation();

    useEffect(() => {
        const fetchMenuItems = async () => {
            try {
                const response = await axios.get('http://localhost:5001/api/menu-items');
                const data = response.data;

                setMenuItems(data);

                // Extract unique categories from the fetched menu items
                const uniqueCategories = [...new Set(data.map(item => item.category.categoryName))];
                setCategories(uniqueCategories.map((name, index) => ({ name, id: index })));
            } catch (error) {
                console.error('Error fetching menu items:', error);
            }
        };

        fetchMenuItems();
    }, []);

    useEffect(() => {
        if (fetchedCategories) {
            const updatedCategories = fetchedCategories.map(category => ({
                name: category.categoryName,
                id: category._id, 
                show: category.show // Directly use the `show` field from the API
            }));

            setCategoryState(updatedCategories);
        }
    }, [fetchedCategories]);

    const toggleEnableItem = async (id) => {
        try {
            const item = menuItems.find(item => item._id === id);
            if (item) {
                const updatedItems = menuItems.map(item =>
                    item._id === id ? { ...item, show: !item.show } : item
                );
                setMenuItems(updatedItems);

                // Update the item status on the server
                await axios.patch(`http://localhost:5001/api/menu-items/${id}`, { show: !item.show });
            } else {
                console.error('Item not found:', id);
            }
        } catch (error) {
            console.error('Error updating item status:', error);
        }
    };

    const toggleEnableCategory = async (categoryId) => {
        try {
            const category = categoryState.find(cat => cat.id === categoryId);
            if (category) {
                const updatedCategories = categoryState.map(cat =>
                    cat.id === categoryId ? { ...cat, show: !cat.show } : cat
                );
                setCategoryState(updatedCategories);

                // Update the category status on the server
                await updateCategoryStatus({ id: categoryId, show: !category.show }).unwrap();
            } else {
                console.error('Category not found:', categoryId);
            }
        } catch (error) {
            console.error('Error updating category status:', error);
        }
    };

    if (fetchError) return <div>Error fetching categories</div>;

    return (
        <div className="max-w-6xl mx-auto p-6 bg-gray-100 shadow-md">
            <div className="flex justify-between items-center mb-2">
                <div className="text-xl text-gray-700 font-medium">Standard Menu</div>
                <Link to='addmenuitem'>
                    <button className="bg-blue-500 text-white lg:px-2 lg:py-1 lg:text-base text-sm px-1 py-[2px] rounded-lg">+ Add Menu Item</button>
                </Link>
            </div>

            <div className="flex flex-wrap gap-4 mb-6">
                {categoryState.map(category => (
                    <div
                        key={category.id} 
                        className='flex items-center px-4 py-[6px] border rounded-2xl hover:bg-black hover:text-white w-fit'
                    >
                        <span>{category.name}</span>
                    </div>
                ))}
            </div>

            <div className="space-y-6">
                {categoryState.map(category => (
                    <div key={category.id}> 
                        <div className='flex flex-row gap-5 items-center '>
                            <div className="text-xl font-semibold mb-4">{category.name}</div>
                            <button
                                onClick={() => toggleEnableCategory(category.id)} 
                                className="mb-4"
                            >
                                {category.show ? (
                                    <FaToggleOn className='text-green-600 size-7' />
                                ) : (
                                    <FaToggleOff className='text-gray-300 size-7' />
                                )}
                            </button>
                        </div>

                        <div className="space-y-4">
                            {menuItems
                                .filter(item => item.category.categoryName === category.name && item.show) // Use `item.show` here
                                .map(item => (
                                    <div key={item._id}>
                                        {item.subCategory && item.subCategory.name && (
                                            <div className="text-lg italic text-red-600 mb-2">
                                                {item.subCategory.name}
                                            </div>
                                        )}
                                        <Link to={`/admin/menu/edit-item-menu/${item._id}`}>
                                            <div className='flex justify-between items-center bg-white shadow-xl p-4 rounded-lg w-fit cursor-pointer'>
                                                <div>
                                                    <div className='flex flex-row items-center gap-x-3'>
                                                        <div className="text-lg font-medium">{item.name}</div>
                                                        <div>
                                                            {item.veg ? (
                                                                <span className="text-green-500"><GrSquare className='size-[15px]' /></span>
                                                            ) : (
                                                                <span className="text-red-500"><GrSquare className='size-[15px]' /></span>
                                                            )}
                                                        </div>
                                                    </div>
                                                    <div className="text-sm text-gray-600">{item.description}</div>
                                                    <div className='flex flex-row justify-between items-center lg:gap-40 gap-10'>
                                                        <div className="text-sm text-gray-600">₹ {item.price}.00</div>
                                                        <button
                                                            onClick={(e) => {
                                                                e.preventDefault(); 
                                                                toggleEnableItem(item._id);
                                                            }}
                                                        >
                                                            {item.show ? <FaToggleOn className='text-green-600 size-7' /> : <FaToggleOff className='text-gray-300 size-7' />}
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>
                                        </Link>
                                    </div>
                                ))}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Menu;
