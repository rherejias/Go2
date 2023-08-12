import { memo } from "react";
import Paper from "@mui/material/Paper";

import Page from "../../../components/Page";
import TrainerFilterForm from './TrainerFilterForm';
import TrainerTable from './TrainerTable';
import TrainerFooter from './TrainerFooter';

import 'react-toastify/dist/ReactToastify.css';

function Trainer() {
  return (
    <Page>
      <TrainerFilterForm />
      <Paper sx={{ margin: "auto", marginTop: 2 }}>
        <TrainerTable />
      </Paper>
      <TrainerFooter />
    </Page>
  );
}

export default memo(Trainer);
