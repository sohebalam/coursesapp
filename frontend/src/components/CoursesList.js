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
import ImageIcon from "@material-ui/icons/Image"
import { Alert } from "@material-ui/lab"
import download from "downloadjs"
import axios from "axios"
import { API_URL } from "../utils/constants"
import PictureAsPdfIcon from "@material-ui/icons/PictureAsPdf"
import FileCopyIcon from "@material-ui/icons/FileCopy"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { library, icon } from "@fortawesome/fontawesome-svg-core"
import { faFilePdf } from "@fortawesome/free-regular-svg-icons"
import { faFileImage } from "@fortawesome/free-regular-svg-icons"
import { faFileCode } from "@fortawesome/free-regular-svg-icons"

library.add(faFilePdf, faFileImage, faFileCode)

const CoursesList = ({}) => {
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
    <Grid item>
      {errorMsg && <Typography>{errorMsg}</Typography>}
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Title</TableCell>
            <TableCell>Description</TableCell>
            <TableCell>Download File</TableCell>
            <TableCell>Delete</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {filesList.length > 0 ? (
            filesList.map(
              ({ _id, title, description, file_path, file_mimetype }) => (
                <TableRow key={_id}>
                  <TableCell>{title}</TableCell>
                  <TableCell>{description}</TableCell>
                  <TableCell>
                    <Link
                      href="#/"
                      onClick={() =>
                        downloadFile(_id, file_path, file_mimetype)
                      }
                    >
                      Download{" "}
                      {file_path.split(".").pop() === "pdf" ? (
                        <FontAwesomeIcon
                          icon={faFilePdf}
                          width={400}
                          height={400}
                        />
                      ) : file_path.split(".").pop() === "json" ? (
                        <FontAwesomeIcon
                          icon={faFileCode}
                          width={400}
                          height={400}
                        />
                      ) : file_path.split(".").pop() === "jpg" ? (
                        <FontAwesomeIcon
                          icon={faFileImage}
                          width={400}
                          height={400}
                        />
                      ) : file_path.split(".").pop() === "jpeg" ? (
                        <FontAwesomeIcon
                          icon={faFileImage}
                          width={400}
                          height={400}
                        />
                      ) : file_path.split(".").pop() === "png" ? (
                        <FontAwesomeIcon
                          icon={faFileImage}
                          width={400}
                          height={400}
                        />
                      ) : null}
                    </Link>
                  </TableCell>
                  <TableCell>Delete</TableCell>
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
  )
}

export default CoursesList
