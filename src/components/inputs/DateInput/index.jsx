import { Box, TextField, Typography } from "@mui/material";
import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { getIn } from "formik";
import ToolTip from "components/commons/ToolTip";
import { parse, format } from 'date-fns';

export default function DateInput(props) {
    const { field, fieldLabel, form, tooltip } = props;

    return (
        <Box sx={{ marginTop: '5px', marginBottom: '5px' }}>
            <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                <Typography sx={{ fontFamily: 'Fira Sans', fontSize: 16 }}>
                    {fieldLabel}
                </Typography>
                {tooltip && <ToolTip text={tooltip} fontSize='14px' placement='right' />}
            </Box>

            <LocalizationProvider dateAdapter={AdapterDateFns}>
                <DesktopDatePicker
                    onChange={(newValue) => {
                        if (newValue instanceof Date) {
                            const formattedDate = newValue.toISOString();
                            form.setFieldValue(field.name, formattedDate);
                        } else {
                            form.setFieldValue(field.name, null);
                        }
                    }}
                    minDate={new Date()}
                    openTo="day"
                    format="dd-MM-yyyy"
                    views={["day"]}
                    sx={{
                        '& .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline': { border: '1px solid #344345' },
                        '& .MuiOutlinedInput-root:hover .MuiOutlinedInput-notchedOutline': { border: '1px solid #344345' },
                        '& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline': { border: '1px solid #344345' },
                        '& .MuiOutlinedInput-root input': { fontSize: 16, fontFamily: 'Fira Sans' },
                        '& .MuiOutlinedInput-root': { height: 42 }
                    }}
                    renderInput={(params) => (
                        <TextField
                            {...params}
                            variant="outlined"
                            fullWidth
                            size="small"
                            sx={{
                                width: '100%',
                                borderColor:
                                    getIn(form.errors, field.name) && getIn(form.touched, field.name)
                                        ? '#FF0000'
                                        : '#344345',
                            }}
                            error={Boolean(getIn(form.errors, field.name) && getIn(form.touched, field.name))}
                            helperText={
                                getIn(form.touched, field.name) && getIn(form.errors, field.name)
                                    ? getIn(form.errors, field.name)
                                    : ''
                            }
                        />
                    )}
                />
            </LocalizationProvider>
        </Box>
    );
}
