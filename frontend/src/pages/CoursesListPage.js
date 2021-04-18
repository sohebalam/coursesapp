import React, { useState, useEffect } from "react"
import {
  Container,
  AppBar,
  Typography,
  Grow,
  Grid,
  TableHead,
  TableCell,
  TableRow,
  Table,
  TableBody,
  CircularProgress,
  Link,
  Button,
} from "@material-ui/core"

// import useStyles from "../../styles"

import { Alert } from "@material-ui/lab"
import download from "downloadjs"
import axios from "axios"
import { API_URL } from "../utils/constants"

const ProductEditPage = ({}) => {
  // const classes = useStyles()
  const [filesList, setFilesList] = useState([])
  const [errorMsg, setErrorMsg] = useState("")

  useEffect(() => {
    const getFilesList = async () => {
      try {
        const { data } = await axios.get(`${API_URL}/getAllFiles`)
        setErrorMsg("")
        setFilesList(data)
      } catch (error) {
        error.response && setErrorMsg(error.response.data)
      }
    }

    getFilesList()
  }, [])

  const downloadFile = async (id, path, mimetype) => {
    try {
      const result = await axios.get(`${API_URL}/download/${id}`, {
        responseType: "blob",
      })
      const split = path.split("/")
      const filename = split[split.length - 1]
      setErrorMsg("")
      return download(result.data, filename, mimetype)
    } catch (error) {
      if (error.response && error.response.status === 400) {
        setErrorMsg("Error while downloading file. Try again later")
      }
    }
  }

  return (
    <Container maxWidth="lg">
      {/* <Grow in>
        <Container>
          <Grid
            container
            justify="space-between"
            alignItems="stretch"
            spacing={3}
          >
            <Grid item xs={12} sm={8}>
              {errorMsg && <Typography>{errorMsg}</Typography>}
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Title</TableCell>
                    <TableCell>Description</TableCell>
                    <TableCell>Download File</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {filesList.length > 0 ? (
                    filesList.map(
                      ({
                        _id,
                        title,
                        description,
                        file_path,
                        file_mimetype,
                      }) => (
                        <TableRow key={_id}>
                          <TableCell>{title}</TableCell>
                          <TableCell>{description}</TableCell>
                          <TableCell>
                            <a
                              href="#/"
                              onClick={() =>
                                downloadFile(_id, file_path, file_mimetype)
                              }
                            >
                              Download
                            </a>
                          </TableCell>
                        </TableRow>
                      )
                    )
                  ) : (
                    <TableRow>
                      <TableCell colSpan={3} style={{ fontWeight: "300" }}>
                        No files found. Please add some.
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </Grid>
          </Grid>
        </Container>
      </Grow> */}
    </Container>
  )
}

export default ProductEditPage
