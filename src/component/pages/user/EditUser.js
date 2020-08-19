import React, { Component, useMemo } from 'react'
import { Link, withRouter } from 'react-router-dom'
import { TextInput, EmailInput, Select } from '../../modules/form'
import { toast } from 'react-toastify'
import { useForm } from "react-form"
import { getUser, saveUser, deleteUser } from '../../../client/user'
import { Modal } from 'react-bootstrap'

function EditUserForm({ defaultValues, isNew = false, onSave, onDelete }) {
    const {
        Form,
        meta: { isSubmitting, canSubmit }
    } = useForm({
        onSubmit: (values) => {
            if (onSave) {
                onSave(values).then((res) => {
                    console.log(res);
                });
            }
        },
        defaultValues: useMemo(() => { return { ...defaultValues } }, [defaultValues])
    });

    return (
        <Form>
            <div className="form-row">
                <div className="form-group col-md-3">
                    <TextInput inputGroup={
                        {
                            prepend: <span className="input-group-text">@</span>
                        }
                    } name="userName" displayName="User Name" placeholder="Username" required={true} />
                </div>
                <div className="form-group col-md-3">
                    <TextInput name="name" displayName="Name" placeholder="Name" required={true} />
                </div>
                <div className="form-group col-md-6">
                    <EmailInput name="email" placeholder="Email" displayName="Email" />
                </div>
            </div>

            <div className="form-row">
                <div className="form-group col-md-3">
                    <label>Password</label>
                    <Link className="badge badge-pill badge-info d-block" to="/users/changePassword/">Click here to change password</Link>
                </div>
                <div className="form-group col-md-3">
                    <input type="checkbox" id="editPasswordNeedChange" name="passwordNeedChange" placeholder="Password Need Change" />{" "}
                    <label htmlFor="editPasswordNeedChange">Password Need Change</label>
                </div>
                <div className="form-group col-md-3">
                    <Select name="permissionLevel" displayName="Permission Level" options={[
                        {
                            name: "Member",
                            value: 0
                        },
                        {
                            name: "Leader",
                            value: 1
                        },
                        {
                            name: "Admin",
                            value: 2
                        },
                        {
                            name: "Super",
                            value: 3
                        }
                    ]} />
                </div>
                <div className="form-group col-md-3">
                    <TextInput name="category" displayName="Category" placeholder="Category" />
                </div>
            </div>

            <div className="form-row">
                <div className="form-group col-md-2">
                    <TextInput name="firstYear" displayName="First Year" placeholder="First Year" type="number" />
                </div>
                <div className="form-group col-md-2">
                    <TextInput name="graduationYear" displayName="Graduation Year" placeholder="Graduation Year" type="number" />
                </div>
            </div>

            <div className="form-row">
                <div className="col-12 col-md-8">
                    <button className="btn btn-primary btn-block" type="submit" disabled={!canSubmit || isSubmitting}>Save</button>
                </div>
                <div className="col-12 col-md-4">
                    <button className="btn btn-danger btn-block" type="button" onClick={onDelete} disabled={isNew}>Delete</button>
                </div>
            </div>
        </Form>
    )
}

export class EditUser extends Component {

    state = {
        editUser: {},
        loaded: false,
        error: null,
        showConfirmDelete: false
    }

    componentDidMount = () => {
        if (this.props.match) {
            const id = this.props.match.params.id;
            if (id !== "new") {
                getUser(id).then((r) => r.json())
                    .then((res) => {
                        if (res.error) {
                            this.setState({
                                error: res.error
                            })
                        } else {
                            this.setState({
                                editUser: res,
                                loaded: true
                            })
                        }
                    });
            } else {
                this.setState({
                    loaded: true
                })
            }
        }
    }

    handleFormOnSave = (user) => {
        let id = this.props.match.params.id;
        if (id === "new") id = null;

        let toastId = toast("Saving...", { autoClose: false });

        return saveUser(id, user).then((r) => r.json()).then((res) => {
            if (res.error) {
                toast.update(toastId, { type: toast.TYPE.ERROR, autoClose: 5000, render: res.error });
            } else {
                toast.update(toastId, { type: toast.TYPE.SUCCESS, autoClose: 5000, render: "Done" });
                this.props.history.push("/users");
            }

            return Promise.resolve(res);
        });
    }

    handleConfirmDeleteUser = () => {
        let id = this.props.match.params.id;
        if (id === "new") return;

        let toastId = toast("Deleting...", { autoClose: false });

        deleteUser(id).then((r) => {
            if (r.status === 204) {
                toast.update(toastId, { type: toast.TYPE.SUCCESS, autoClose: 5000, render: "Done" });
                this.props.history.push("/users");
            } else {
                r.text().then((value) => {
                    toast.update(toastId, { type: toast.TYPE.ERROR, autoClose: 5000, render: `${value}` });
                })
            }
        })
    }

    handleFormOnDelete = () => {
        let id = this.props.match.params.id;
        if (id === "new") return;

        this.setState({
            showConfirmDelete: true
        });
    }

    render() {
        if (this.state.error) {
            toast.error(this.state.error)
        }

        return (
            <div className="container">
                <h3>Edit user</h3>
                <div className="row">
                    <div className="col">
                        {this.state.loaded ?
                            <EditUserForm
                                className="mt-lg-4" defaultValues={this.state.editUser} isNew={this.props.match.params.id === "new"}
                                onSave={this.handleFormOnSave} onDelete={this.handleFormOnDelete}
                            />
                            :
                            <div className="text-center mt-2">
                                {
                                    this.state.error ?
                                        <h5><span className="badge badge-danger">{this.state.error}</span></h5>
                                        :
                                        <div className="spinner-border text-primary" role="status">
                                            <span className="sr-only">Loading...</span>
                                        </div>
                                }
                            </div>
                        }
                    </div>
                </div>
                <Modal show={this.state.showConfirmDelete} onHide={() => this.setState({ showConfirmDelete: false })}>
                    <Modal.Header closeButton>
                        <Modal.Title>Confirm Delete User</Modal.Title>
                    </Modal.Header>

                    <Modal.Body>
                        <p>
                            Are you sure you want to delete user
                            <span className="badge badge-warning">
                                {this.state && this.state.editUser && this.state.editUser.name}
                            </span>?
                        </p>
                    </Modal.Body>

                    <Modal.Footer>
                        <button className="btn btn-danger" onClick={this.handleConfirmDeleteUser}>Delete</button>
                        <button className="btn btn-secondary" onClick={() => this.setState({ showConfirmDelete: false })}>Cancel</button>
                    </Modal.Footer>
                </Modal>
            </div >
        )
    }
}

export default withRouter(EditUser)
