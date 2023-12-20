// Dashboard.js
import React, { useEffect, useState } from "react";

import DataTable from "react-data-table-component";
import { BsPencil, BsTrash, BsEye } from "react-icons/bs";
import { Card, Spinner } from "react-bootstrap";
import EditModal from "./components/EditModal";
import { useNavigate } from "react-router-dom";
import EditForm from "./components/EditForm";
import toast from "react-hot-toast";

const Dashboard = () => {
  const [showEditModal, setShowEditModal] = useState(false);
  const [userWantToEdit, setUserWantToEdit] = useState({});
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);
  const [deletingRowId, setDeletingRowId] = useState(null);

  const navigate = useNavigate();

  const fetchUsers = async () => {
    try {
      setIsLoading(true);
      const response = await fetch(
        "https://jsonplaceholder.typicode.com/users"
      );
      const data = await response.json();
      setUsers(data);
      setIsLoading(false);
      setUsers(data);
    } catch (err) {
      setIsLoading(false);
      console.log(err);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleEdit = (row) => {
    setUserWantToEdit(row);
    setShowEditModal(true);
  };

  const handleView = (userId) => {
    navigate(`/userDetails/${userId}`);
  };

  const onUpdate = async (user, formVal) => {
    setIsUpdating(true);
    fetch(`https://jsonplaceholder.typicode.com/users/${user.id}`, {
      method: "PUT",
      body: JSON.stringify(formVal),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    })
      .then((response) => response.json())
      .then((res) => {
        setIsUpdating(false);
        let updatedUsers = users.map((u) => (u.id == user.id ? res : u));
        setUsers(updatedUsers);

        setShowEditModal(false);
        toast.success("user updated successfully");
      })
      .catch((err) => {
        setIsUpdating(false);
        toast.error("error updating user");
      });
  };

  const columns = [
    {
      name: "ID",
      selector: (row) => row.id,
      sortable: true,
    },
    {
      name: "Name",
      selector: (row) => row.name,
      sortable: true,
    },
    {
      name: "Username",
      selector: (row) => row.username,
      sortable: true,
    },
    {
      name: "Email",
      selector: (row) => row.email,
      sortable: true,
    },
    {
      name: "Actions",
      cell: (row) => (
        <div style={{ cursor: "pointer", display: "flex" }}>
          <BsPencil
            onClick={() => handleEdit(row)}
            size={"1.5rem"}
            className="mx-2"
          />
          {deletingRowId === row.id ? (
            <Spinner animation="border" variant="dark" size="md" />
          ) : (
            <BsTrash
              onClick={() => handleDelete(row.id)}
              size={"1.5rem"}
              className="mx-2"
            />
          )}
          <BsEye
            onClick={() => handleView(row.id)}
            size={"1.5rem"}
            className="mx-2 pe-auto"
          />
        </div>
      ),
    },
  ];

  const handleDelete = async (userId) => {
    setDeletingRowId(userId);
    try {
      let response = await fetch(
        `https://jsonplaceholder.typicode.com/posts/${userId}`,
        {
          method: "DELETE",
        }
      );
      if (response.ok) {
        setDeletingRowId(null);
        setUsers(users.filter((user) => user.id !== userId));
        toast.success("user deleted successfully");
      }
    } catch (err) {
      setDeletingRowId(null);
      toast.error("error deleting user");
    }
  };

  return (
    <div>
      <h2 className="text-center m-2">User List</h2>
      <Card className="m-3 overflow-hidden">
        <DataTable
          columns={columns}
          data={users}
          pagination
          highlightOnHover
          progressPending={isLoading}
        />
      </Card>
      <EditModal
        show={showEditModal}
        handleClose={() => setShowEditModal(false)}
      >
        <EditForm
          user={userWantToEdit}
          onUpdate={onUpdate}
          isUpdating={isUpdating}
        />
      </EditModal>
    </div>
  );
};

export default Dashboard;
