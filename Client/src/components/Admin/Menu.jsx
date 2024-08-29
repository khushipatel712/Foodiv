import React, { useState, useEffect } from 'react';
import { GrSquare } from "react-icons/gr";
import { FaToggleOff, FaToggleOn } from "react-icons/fa6";
import { Link } from 'react-router-dom';
import { useFetchCategoriesQuery, useUpdateCategoryStatusMutation, useDeleteCategoryMutation } from '../../services/categoryApi'; 
import { useFetchMenuItemsQuery, useUpdateMenuItemStatusMutation } from '../../services/menuitemApi';
import { MdDelete } from "react-icons/md";

const Menu = () => {
    const { data: fetchedCategories, error: fetchError } = useFetchCategoriesQuery();
    const [categories, setCategories] = useState(fetchedCategories || []);
    const [updateCategoryStatus] = useUpdateCategoryStatusMutation();
    const [deleteCategory] = useDeleteCategoryMutation();

    const { data: fetchedMenuItems, error: menuItemsError } = useFetchMenuItemsQuery();
    const [menuItems, setMenuItems] = useState(fetchedMenuItems || []);
    const [updateMenuItemStatus] = useUpdateMenuItemStatusMutation();

    useEffect(() => {
        if (fetchedCategories) setCategories(fetchedCategories);
    }, [fetchedCategories]);

    useEffect(() => {
        if (fetchedMenuItems) setMenuItems(fetchedMenuItems);
    }, [fetchedMenuItems]);

    const toggleEnableCategory = async (categoryId) => {
        const updatedCategories = categories.map(cat =>
            cat._id === categoryId ? { ...cat, show: !cat.show } : cat
        );
        setCategories(updatedCategories);

        try {
            await updateCategoryStatus({ id: categoryId, show: !categories.find(cat => cat._id === categoryId).show }).unwrap();
        } catch (error) {
            console.error('Error updating category status:', error);
            // Revert local state if error occurs
            setCategories(categories.map(cat =>
                cat._id === categoryId ? { ...cat, show: !cat.show } : cat
            ));
        }
    };

    const toggleEnableMenuItem = async (menuItemId) => {
        const updatedMenuItems = menuItems.map(item =>
            item._id === menuItemId ? { ...item, show: !item.show } : item
        );
        setMenuItems(updatedMenuItems);

        try {
            await updateMenuItemStatus({ id: menuItemId, show: !menuItems.find(item => item._id === menuItemId).show }).unwrap();
        } catch (error) {
            console.error('Error updating menu item status:', error);
            // Revert local state if error occurs
            setMenuItems(menuItems.map(item =>
                item._id === menuItemId ? { ...item, show: !item.show } : item
            ));
        }
    };

    const handleDeleteCategory = async (categoryId) => {
        try {
            await deleteCategory(categoryId).unwrap();
            // Remove the deleted category from the state
            setCategories(categories.filter(cat => cat._id !== categoryId));
        } catch (error) {
            console.error('Error deleting category:', error);
            // Optionally handle error
        }
    };

    if (fetchError) return <div>Error fetching categories</div>;
    if (menuItemsError) return <div>Error fetching menu items</div>;

    return (
        <div className="max-w-6xl mx-auto md:p-6 p-2 bg-gray-100 shadow-md">
            <div className="flex justify-between items-center mb-2">
                <div className="md:text-xl sm:text-lg text-base text-gray-700 font-medium">Standard Menu</div>
                <Link to='addmenuitem'>
                    <button className="bg-blue-500 text-white lg:px-2 lg:py-1 lg:text-base sm:text-sm text-xs px-1 py-[2px] rounded-lg">+ Add Menu Item</button>
                </Link>
            </div>

            <div className="flex flex-wrap gap-4 mb-6">
                {categories.map(category => (
                    <div
                        key={category._id} 
                        className='flex items-center text-sm sm:text-base px-4 py-[6px] border rounded-2xl hover:bg-black hover:text-white w-fit'
                    >
                        <span>{category.categoryName}</span>
                        <button
                            onClick={() => handleDeleteCategory(category._id)}
                            className="ml-2 text-red-500 hover:text-white "
                        >
                            <MdDelete className='sm:size-5 size-4 hover:text-white'/>
                        </button>
                    </div>
                ))}
            </div>

            <div className="space-y-6">
                {categories.map(category => (
                    <div key={category._id}> 
                        <div className='flex flex-row gap-5 items-center '>
                            <div className="md:text-xl text-lg font-semibold mb-4">{category.categoryName}</div>
                            <button
                                onClick={() => toggleEnableCategory(category._id)} 
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
                                .filter(item => item.category && item.category.categoryName === category.categoryName)
                                .map(item => (
                                    <div key={item._id}>
                                        {item.subCategory && item.subCategory.name && (
                                            <div className="md:text-lg text-base italic text-red-600 mb-2">
                                                {item.subCategory.name}
                                            </div>
                                        )}
                                        <Link to={`/admin/menu/edit-item-menu/${item._id}`}>
                                            <div className='flex justify-between items-center bg-white shadow-xl p-4 rounded-lg w-fit cursor-pointer'>
                                                <div>
                                                    <div className='flex flex-row items-center gap-x-3'>
                                                        <div className="md:text-lg text-base font-medium">{item.name}</div>
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
                                                                toggleEnableMenuItem(item._id);
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
