import React, { Component, useMemo } from 'react'
import { withRouter } from 'react-router-dom'
import { TextInput } from '../modules/form'
import { getTimeLog, saveTimeLog } from '../../client/timeLog'
import { toast } from 'react-toastify'
import { useForm } from 'react-form'

function EditTimeLogForm({ defaultValues, onSave }) {
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

    if (isSubmitting) {

    }

    return (
        <Form>
            <div className="form-row">
                <div className="form-group col-md-4">
                    <TextInput name="Id" displayName="Id" placeholder="New Id" disabled={true} />
                </div>
                <div className="form-group col-md-4">
                    <TextInput name="userId" placeholder="User" displayName="User Id" required={true} />
                </div>
                <div className="form-group col-md-4">
                    <TextInput name="seasonId" placeholder="Season" displayName="Season Id" required={true} />
                </div>
            </div>

            <div className="form-row">
                <div className="form-group col-md-4">
                    <TextInput name="timeIn" displayName="Time In" required={true} />
                </div>
                <div className="form-group col-md-4">
                    <TextInput name="timeOut" displayName="Time Out" />
                </div>
            </div>

            <div className="form-row">
                <div className="form-group col-md-8">
                    <button className="btn btn-primary btn-block" type="submit" disabled={!canSubmit}>Submit</button>
                </div>
                <div className="form-group col-md-4">
                    <button className="btn btn-danger btn-block" type="button">Delete</button>
                </div>
            </div>
        </Form>
    )
}

export class EditTimeLog extends Component {

    state = {
        editTimeLog: {},
        error: null
    }

    componentDidMount = () => {
        if (this.props.match) {
            const id = this.props.match.params.id;
            if (id !== "new") {
                getTimeLog(id).then((r) => r.json())
                    .then((res) => {
                        if (res.error) {
                            this.setState({
                                error: res.error
                            })
                        } else {
                            this.setState({
                                editTimeLog: res
                            })
                        }
                    });
            }
        }
    }

    handleFormOnSave = (timeLog) => {
        let id = this.props.match.params.id;
        if (id === "new") id = null;
        console.log(timeLog);
        return saveTimeLog(id, timeLog).then((r) => r.json());
    }

    render() {
        if (this.state.error) {
            toast.error(this.state.error)
        }

        return (
            <div className="container">
                <h3>Edit timeLog</h3>
                <div className="row justify-content-lg-center">
                    <div className="col col-lg-10">
                        <EditTimeLogForm className="mt-lg-4" defaultValues={this.state.editTimeLog} onSave={this.handleFormOnSave} />
                    </div>
                </div>
            </div >
        )
    }
}

export default withRouter(EditTimeLog)
