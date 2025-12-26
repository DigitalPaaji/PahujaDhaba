'use client';

import { useState, useEffect } from 'react';
import { 
  FaPlus, 
  FaEdit, 
  FaTrash, 
  FaToggleOn, 
  FaToggleOff,
  FaUpload,
  FaTimes
} from 'react-icons/fa';

const API_URL = 'http://localhost:5000/api';

export default function AdminPanel({ menuItems, categories, onClose, onUpdate }) {
  const [items, setItems] = useState(menuItems);
  const [editingItem, setEditingItem] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    category: 'breakfast',
    type: 'veg',
    available: true,
    image: null
  });

  useEffect(() => {
    setItems(menuItems);
  }, [menuItems]);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setFormData(prev => ({ ...prev, image: file }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const formDataToSend = new FormData();
    Object.keys(formData).forEach(key => {
      if (key !== 'image' || formData.image) {
        formDataToSend.append(key, formData[key]);
      }
    });

    try {
      const url = editingItem 
        ? `${API_URL}/menu/${editingItem.id}`
        : `${API_URL}/menu`;
      
      const method = editingItem ? 'PUT' : 'POST';
      
      const response = await fetch(url, {
        method,
        body: formDataToSend
      });

      if (response.ok) {
        resetForm();
        onUpdate();
      }
    } catch (error) {
      console.error('Error saving item:', error);
    }
  };

  const handleEdit = (item) => {
    setEditingItem(item);
    setFormData({
      name: item.name,
      description: item.description,
      price: item.price.toString(),
      category: item.category,
      type: item.type,
      available: item.available,
      image: null
    });
  };

  const handleDelete = async (id) => {
    if (confirm('Are you sure you want to delete this item?')) {
      try {
        await fetch(`${API_URL}/menu/${id}`, { method: 'DELETE' });
        onUpdate();
      } catch (error) {
        console.error('Error deleting item:', error);
      }
    }
  };

  const toggleAvailability = async (id) => {
    try {
      await fetch(`${API_URL}/menu/${id}/toggle`, { method: 'PATCH' });
      onUpdate();
    } catch (error) {
      console.error('Error toggling availability:', error);
    }
  };

  const resetForm = () => {
    setEditingItem(null);
    setFormData({
      name: '',
      description: '',
      price: '',
      category: 'breakfast',
      type: 'veg',
      available: true,
      image: null
    });
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 overflow-y-auto">
      <div className="min-h-screen flex items-center justify-center p-4">
        <div className="bg-white rounded-xl shadow-2xl w-full max-w-6xl max-h-[90vh] overflow-hidden">
          <div className="flex justify-between items-center p-6 border-b">
            <h2 className="text-2xl font-bold">Admin Panel - Manage Menu</h2>
            <button
              onClick={onClose}
              className="text-gray-500 hover:text-gray-700"
            >
              <FaTimes size={24} />
            </button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 p-6">
            {/* Form Section */}
            <div className="space-y-6">
              <div className="card p-6">
                <h3 className="text-xl font-bold mb-4">
                  {editingItem ? 'Edit Menu Item' : 'Add New Menu Item'}
                </h3>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium mb-1">Item Name *</label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      className="input-field"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-1">Description</label>
                    <textarea
                      name="description"
                      value={formData.description}
                      onChange={handleInputChange}
                      className="input-field h-24"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium mb-1">Price (₹) *</label>
                      <input
                        type="number"
                        name="price"
                        value={formData.price}
                        onChange={handleInputChange}
                        className="input-field"
                        step="0.01"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-1">Category</label>
                      <select
                        name="category"
                        value={formData.category}
                        onChange={handleInputChange}
                        className="input-field"
                      >
                        {categories.map(cat => (
                          <option key={cat.id} value={cat.id}>
                            {cat.name}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium mb-1">Type</label>
                      <select
                        name="type"
                        value={formData.type}
                        onChange={handleInputChange}
                        className="input-field"
                      >
                        <option value="veg">Vegetarian</option>
                        <option value="non-veg">Non-Vegetarian</option>
                      </select>
                    </div>
                    <div className="flex items-center">
                      <input
                        type="checkbox"
                        name="available"
                        checked={formData.available}
                        onChange={handleInputChange}
                        className="mr-2 h-5 w-5"
                        id="available"
                      />
                      <label htmlFor="available" className="text-sm font-medium">
                        Available
                      </label>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-1">Image</label>
                    <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center">
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleImageChange}
                        className="hidden"
                        id="image-upload"
                      />
                      <label htmlFor="image-upload" className="cursor-pointer">
                        <FaUpload className="mx-auto text-gray-400 mb-2" size={24} />
                        <p className="text-sm text-gray-600">
                          {formData.image ? formData.image.name : 'Click to upload image'}
                        </p>
                      </label>
                    </div>
                  </div>

                  <div className="flex space-x-4">
                    <button type="submit" className="btn-primary flex-1">
                      {editingItem ? 'Update Item' : 'Add Item'}
                    </button>
                    {editingItem && (
                      <button
                        type="button"
                        onClick={resetForm}
                        className="btn-secondary flex-1"
                      >
                        Cancel
                      </button>
                    )}
                  </div>
                </form>
              </div>
            </div>

            {/* Items List Section */}
            <div className="card p-6">
              <h3 className="text-xl font-bold mb-4">Current Menu Items</h3>
              <div className="overflow-y-auto max-h-[500px]">
                <table className="w-full">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="text-left p-3">Item</th>
                      <th className="text-left p-3">Price</th>
                      <th className="text-left p-3">Status</th>
                      <th className="text-left p-3">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {items.map(item => (
                      <tr key={item.id} className="border-t hover:bg-gray-50">
                        <td className="p-3">
                          <div className="flex items-center">
                            {item.image && (
                              <img 
                                src={`http://localhost:5000${item.image}`} 
                                alt={item.name}
                                className="w-10 h-10 object-cover rounded mr-3"
                              />
                            )}
                            <div>
                              <p className="font-medium">{item.name}</p>
                              <p className="text-sm text-gray-600 truncate max-w-xs">
                                {item.description}
                              </p>
                            </div>
                          </div>
                        </td>
                        <td className="p-3">₹{item.price}</td>
                        <td className="p-3">
                          <span className={`px-2 py-1 text-xs rounded ${
                            item.available 
                              ? 'bg-green-100 text-green-800' 
                              : 'bg-red-100 text-red-800'
                          }`}>
                            {item.available ? 'Available' : 'Unavailable'}
                          </span>
                        </td>
                        <td className="p-3">
                          <div className="flex space-x-2">
                            <button
                              onClick={() => toggleAvailability(item.id)}
                              className="text-blue-600 hover:text-blue-800"
                              title="Toggle Availability"
                            >
                              {item.available ? <FaToggleOn size={20} /> : <FaToggleOff size={20} />}
                            </button>
                            <button
                              onClick={() => handleEdit(item)}
                              className="text-yellow-600 hover:text-yellow-800"
                              title="Edit"
                            >
                              <FaEdit size={18} />
                            </button>
                            <button
                              onClick={() => handleDelete(item.id)}
                              className="text-red-600 hover:text-red-800"
                              title="Delete"
                            >
                              <FaTrash size={18} />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}