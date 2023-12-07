import React, { useEffect, useState } from 'react';
import './bookmarks.css';

const ScriptList = () => {
    const [bookmarks, setBookmarks] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [updateData, setUpdateData] = useState({ id: '', title: '', URL: '' });

    useEffect(() =>{
        handleSearch();
    },[]);

    const handleSearch = async () => {
        const response = await fetch(`http://localhost:3000/backend/api/searchByTitle.php?searchTerm=${searchTerm}`);
        const data = await response.json();
        if (Array.isArray(data)) {
            setBookmarks(data);
        } else {
            console.error('Received non-array response:', data);
            setBookmarks([]);
        }
    };

    const handleDelete = async (bookmarkId) => {
        const requestOptions = {
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ id: bookmarkId }),
        };

        await fetch(`http://localhost:3000/backend/api/delete.php`, requestOptions);

        // After deletion, manually trigger the search
        handleSearch();
    };

    const handleUpdate = (bookmark) => {
        setUpdateData({
            id: bookmark.id,
            title: bookmark.title,
            URL: bookmark.URL,
        });
    };

    const handleUpdateSubmit = async (e) => {
        e.preventDefault();

        const requestOptions = {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(updateData),
        };

        await fetch(`http://localhost:3000/backend/api/update.php`, requestOptions);

        // After update, manually trigger the search
        handleSearch();
        setUpdateData({ id: '', title: '', URL: '' });
    };

    return (
        <div className="script-list-container">
            {/* Search bar */}
            <div>
                <input
                    type="text"
                    placeholder="Search by title"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
                <button type="button" onClick={handleSearch}>
                    Search
                </button>
            </div>

            {bookmarks.length === 0 ? (
                <p>No Bookmarks available.</p>
            ) : (
                bookmarks.map((bookmark) => (
                    <div key={bookmark.id} className="bookmark-item">
                        <div className="bookmark-header">
                            <p className="bookmarks-title">{bookmark.title}</p>
                            <p className="date-added">{bookmark.date_added}</p>
                        </div>
                        <div className="bookmark-URL-box">
                            <p className="bookmark-URL">{bookmark.URL}</p>
                        </div>
                        <button onClick={() => handleDelete(bookmark.id)} className="delete-btn">
                            Delete
                        </button>
                        <button onClick={() => handleUpdate(bookmark)} className="update-btn">
                            Update
                        </button>

                        {updateData.id === bookmark.id && (
                            <form onSubmit={handleUpdateSubmit}>
                                <label>
                                    New Title:
                                    <input
                                        type="text"
                                        value={updateData.title}
                                        onChange={(e) =>
                                            setUpdateData({ ...updateData, title: e.target.value })
                                        }
                                    />
                                </label>
                                <label>
                                    New URL:
                                    <input
                                        type="text"
                                        value={updateData.URL}
                                        onChange={(e) =>
                                            setUpdateData({ ...updateData, URL: e.target.value })
                                        }
                                    />
                                </label>
                                <button type="submit">Submit Update</button>
                            </form>
                        )}
                    </div>
                ))
            )}
        </div>
    );
};

export default ScriptList;
