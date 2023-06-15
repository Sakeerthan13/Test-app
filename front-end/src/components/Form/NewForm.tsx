import { Form, Formik } from "formik";
import { advancedSchema } from "../../schemas";
import CustomInput from "./CustomInput";
import CustomSelect from "./CustomSelect";
import { useState } from "react";
import './NewForm.css';

const NewForm = () => {

    const [isLoading, setIsLoading] = useState(false);

    const onSubmit = async (values: any, actions: { resetForm: () => void; }) => {
        setIsLoading(true);
        await new Promise((resolve) => setTimeout(resolve, 2000));

        actions.resetForm();
    };

    const initialValues = {
        fname: "",
        lname: "",
        email: "",
        dob: "",
        gender: "",
    }



    return (
        <div className="body">
            <div className={isLoading ? 'disabled' : ''}>
                <Formik
                    initialValues={initialValues}
                    validationSchema={advancedSchema}
                    onSubmit={onSubmit}
                >
                    {({ isSubmitting }) => (
                        <Form>
                            <CustomInput
                                label="First Name"
                                name="fname"
                                type="text"
                                placeholder="Enter your first name"
                            />
                            <CustomInput
                                label="Last Name"
                                name="lname"
                                type="text"
                                placeholder="Enter your last name"
                            />
                            <CustomInput
                                label="Email"
                                name="email"
                                type="email"
                                placeholder="Enter your email"
                            />
                            <CustomInput
                                label="Date of Birth"
                                name="dob"
                                type="date"
                                placeholder=""
                            />
                            <CustomSelect
                                label="Gender"
                                name="gender"
                                placeholder="Please select a gender type"
                            >
                                <option value="">Please select a gender type</option>
                                <option value="male">Male</option>
                                <option value="female">Female</option>
                                <option value="other">Other</option>
                            </CustomSelect>
                            <button disabled={isSubmitting} type="submit">
                                Submit
                            </button>
                        </Form>
                    )}
                </Formik>
            </div>

            {isLoading && <div className="lds-dual-ring"></div>}

        </div>

    );
};
export default NewForm;
