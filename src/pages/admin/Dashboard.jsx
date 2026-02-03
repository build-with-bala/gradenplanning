import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { Plus, List, Image as ImageIcon, LogOut, Loader2 } from 'lucide-react';

const Dashboard = () => {
    const { logout, token } = useAuth();
    const [activeTab, setActiveTab] = useState('plants'); // 'plants' or 'categories'
    // Data State
    const [plants, setPlants] = useState([]);
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);

    // Form State
    const [showForm, setShowForm] = useState(false);
    const [formData, setFormData] = useState({});
    const [formFile, setFormFile] = useState(null);

    const API_URL = 'http://localhost:3000/api';

    const fetchData = async () => {
        setLoading(true);
        try {
            const [plantsRes, catsRes] = await Promise.all([
                fetch(`${API_URL}/plants`),
                fetch(`${API_URL}/categories`)
            ]);
            setPlants(await plantsRes.json());
            setCategories(await catsRes.json());
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    const handleFileChange = (e) => {
        setFormFile(e.target.files[0]);
    };

    const handleInputChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const data = new FormData();
        Object.keys(formData).forEach(key => data.append(key, formData[key]));
        if (formFile) {
            data.append('image', formFile);
        }

        const endpoint = activeTab === 'plants' ? '/plants' : '/categories';

        try {
            const res = await fetch(`${API_URL}${endpoint}`, {
                method: 'POST',
                headers: {
                    // 'Content-Type': 'multipart/form-data', // Auto-set by fetch when using FormData
                    // 'Authorization': `Bearer ${token}` // TODO: Add auth middleware on backend
                },
                body: data
            });
            if (res.ok) {
                setShowForm(false);
                setFormData({});
                setFormFile(null);
                fetchData();
            }
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <div className="min-h-screen bg-stone-50 font-sans text-stone-900">
            {/* Admin Header */}
            <header className="bg-white border-b border-stone-200 px-8 py-4 flex items-center justify-between sticky top-0 z-10">
                <div className="flex items-center gap-4">
                    <h1 className="text-xl font-bold font-serif">Garden Admin</h1>
                    <div className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded-full font-medium">Dashboard</div>
                </div>
                <button onClick={logout} className="flex items-center gap-2 text-sm text-stone-500 hover:text-red-600 transition-colors">
                    <LogOut className="w-4 h-4" /> Sign Out
                </button>
            </header>

            <div className="max-w-6xl mx-auto p-8">
                {/* Tabs */}
                <div className="flex gap-4 mb-8">
                    <button
                        onClick={() => { setActiveTab('plants'); setShowForm(false); }}
                        className={`px-6 py-2 rounded-full font-medium transition-all ${activeTab === 'plants' ? 'bg-green-600 text-white shadow-md' : 'bg-white text-stone-600 hover:bg-stone-100'}`}
                    >
                        Manage Plants
                    </button>
                    <button
                        onClick={() => { setActiveTab('categories'); setShowForm(false); }}
                        className={`px-6 py-2 rounded-full font-medium transition-all ${activeTab === 'categories' ? 'bg-green-600 text-white shadow-md' : 'bg-white text-stone-600 hover:bg-stone-100'}`}
                    >
                        Manage Categories
                    </button>
                </div>

                {/* Actions */}
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-2xl font-bold font-serif capitalize">{activeTab} List</h2>
                    <button
                        onClick={() => setShowForm(!showForm)}
                        className="flex items-center gap-2 bg-stone-900 text-white px-4 py-2 rounded-lg hover:bg-stone-800 transition-colors"
                    >
                        {showForm ? <List className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
                        {showForm ? 'View List' : `Add ${activeTab === 'plants' ? 'Plant' : 'Category'}`}
                    </button>
                </div>

                {showForm ? (
                    /* ADD FORM */
                    <div className="bg-white rounded-xl shadow-sm border border-stone-200 p-8 max-w-2xl">
                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div>
                                <label className="block text-sm font-medium mb-1">Name</label>
                                <input required name="name" onChange={handleInputChange} className="w-full border p-2 rounded-lg" placeholder="e.g., Tomato" />
                            </div>

                            {activeTab === 'plants' && (
                                <>
                                    <div className="grid grid-cols-2 gap-4">
                                        <div>
                                            <label className="block text-sm font-medium mb-1">Category</label>
                                            <select name="category_id" onChange={handleInputChange} className="w-full border p-2 rounded-lg">
                                                <option value="">Select Category</option>
                                                {categories.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
                                            </select>
                                        </div>
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium mb-1">Short Description</label>
                                        <input name="description" onChange={handleInputChange} className="w-full border p-2 rounded-lg" placeholder="Brief summary..." />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium mb-1">Full Details</label>
                                        <textarea name="details" onChange={handleInputChange} className="w-full border p-2 rounded-lg h-32" placeholder="Growing instructions..." />
                                    </div>
                                </>
                            )}
                            {activeTab === 'categories' && (
                                <div>
                                    <label className="block text-sm font-medium mb-1">Count Label</label>
                                    <input name="count" onChange={handleInputChange} className="w-full border p-2 rounded-lg" placeholder="e.g., 12 varieties" />
                                </div>
                            )}

                            <div>
                                <label className="block text-sm font-medium mb-1">Image</label>
                                <div className="border-2 border-dashed border-stone-300 rounded-lg p-8 text-center hover:border-green-500 transition-colors cursor-pointer relative">
                                    <input type="file" onChange={handleFileChange} className="absolute inset-0 opacity-0 cursor-pointer" />
                                    <ImageIcon className="w-8 h-8 mx-auto text-stone-400 mb-2" />
                                    <span className="text-stone-500 text-sm">{formFile ? formFile.name : 'Click to upload image'}</span>
                                </div>
                            </div>

                            <button type="submit" className="w-full bg-green-600 text-white py-3 rounded-lg font-bold hover:bg-green-700 transition-colors">
                                Save {activeTab === 'plants' ? 'Plant' : 'Category'}
                            </button>
                        </form>
                    </div>
                ) : (
                    /* LIST VIEW */
                    <div className="bg-white rounded-xl shadow-sm border border-stone-200 overflow-hidden">
                        {loading ? (
                            <div className="p-12 flex justify-center"><Loader2 className="animate-spin text-green-600 w-8 h-8" /></div>
                        ) : (
                            <div className="overflow-x-auto">
                                <table className="w-full text-left">
                                    <thead className="bg-stone-50 border-b border-stone-200">
                                        <tr>
                                            <th className="p-4 font-semibold text-stone-700">Image</th>
                                            <th className="p-4 font-semibold text-stone-700">Name</th>
                                            {activeTab === 'plants' && <th className="p-4 font-semibold text-stone-700">Category</th>}
                                            <th className="p-4 font-semibold text-stone-700">Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-stone-100">
                                        {(activeTab === 'plants' ? plants : categories).map(item => (
                                            <tr key={item.id} className="hover:bg-stone-50">
                                                <td className="p-4">
                                                    {item.image && (
                                                        <img src={`http://localhost:3000${item.image}`} alt={item.name} className="w-12 h-12 rounded-lg object-cover bg-stone-100" />
                                                    )}
                                                </td>
                                                <td className="p-4 font-medium">{item.name}</td>
                                                {activeTab === 'plants' && (
                                                    <td className="p-4 text-stone-500">
                                                        {categories.find(c => c.id === item.category_id)?.name || '-'}
                                                    </td>
                                                )}
                                                <td className="p-4">
                                                    <button className="text-sm text-stone-400 hover:text-green-600">Edit</button>
                                                </td>
                                            </tr>
                                        ))}
                                        {(activeTab === 'plants' ? plants : categories).length === 0 && (
                                            <tr>
                                                <td colSpan="4" className="p-8 text-center text-stone-400">No items found.</td>
                                            </tr>
                                        )}
                                    </tbody>
                                </table>
                            </div>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
};

export default Dashboard;
