import React, { useState } from 'react';
import { Box, Button, Container, CssBaseline, Divider, Grid, Typography, IconButton } from '@mui/material';
import { Snack } from "../components/snackBar";
import { addImagesTanque } from "../store/fetch-tanque";
import DeleteIcon from '@mui/icons-material/Delete';
import { imagenes } from "../utils/tanques";

export default function Step2({ tanqueId }: any) {
  const [showSnack, setShowSnack] = useState(false);
  const [message, setMessage] = useState("");
  const [loadingSections, setLoadingSections] = useState<{ [key: string]: boolean }>({});
  const [imageSections, setImageSections] = useState<{ [key: string]: File[] }>({});

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>, type: any) => {
    const files = event.target.files;
    if (files) {
      const newSectionImages = Array.from(files);
      setImageSections((prevSections) => ({
        ...prevSections,
        [type]: prevSections[type] ? prevSections[type].concat(newSectionImages) : newSectionImages,
      }));
    }
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>, type: string) => {
    
    event.preventDefault();

    const newData = {
      images: [] as { mime: string; imagen: unknown }[],
    };

    for (const [section, sectionImages] of Object.entries(imageSections)) {
      if (section === type) {
        const convertedImages = await Promise.all(sectionImages.map(convertToBase64));
  
        const images = convertedImages.map((image, index) => ({
          mime: sectionImages[index].type,
          imagen: image,
        }));
  
        newData.images.push(...images);
      }
    }
    setLoadingSections((prevLoadingSections) => ({
      ...prevLoadingSections,
      [type]: true,
    }));
    saveData(newData, type);
  };

  const convertToBase64 = (file: any) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });
  };

  const saveData = async (convertedImages: any, type: any) => {   
    const { status } = await addImagesTanque(convertedImages, tanqueId, type);
    if (status) {
      setShowSnack(true);
      setMessage("Tanque Guardado con éxito");
      setLoadingSections((prevLoadingSections) => ({
        ...prevLoadingSections,
        [type]: false,
      }));
    }
  };

  const renderImages = (section: string) => {
    const sectionImages = imageSections[section];

    if (sectionImages) {
      return sectionImages.map((image: any, index: any) => {
        if (image.type === "application/pdf") {
          return (
            <Box key={index} sx={{ display: 'inline-block', marginRight: '10px' }}>
              <Box
                sx={{
                  position: 'relative',
                  display: 'inline-block',
                  border: '1px solid #ccc',
                  borderRadius: '4px',
                  overflow: 'hidden',
                  marginBottom: '5px',
                }}
              >
                <embed
                  src={URL.createObjectURL(image)}
                  type="application/pdf"
                  width={150}
                  height={150}
                />
                <IconButton
                  sx={{ position: 'absolute', top: '5px', right: '5px', backgroundColor: '#fff' }}
                  onClick={() => handleImageDelete(section, index)}
                >
                  <DeleteIcon />
                </IconButton>
              </Box>
            </Box>
          );
        } else {
          return (
            <Box key={index} sx={{ display: 'inline-block', marginRight: '10px' }}>
              <Box
                sx={{
                  position: 'relative',
                  display: 'inline-block',
                  border: '1px solid #ccc',
                  borderRadius: '4px',
                  overflow: 'hidden',
                  marginBottom: '5px',
                }}
              >
                <img
                  src={URL.createObjectURL(image)}
                  alt={`Image ${index}`}
                  width={150}
                  height={150}
                />
                <IconButton
                  sx={{ position: 'absolute', top: '5px', right: '5px', backgroundColor: '#fff' }}
                  onClick={() => handleImageDelete(section, index)}
                >
                  <DeleteIcon />
                </IconButton>
              </Box>
            </Box>
          );
        }
      });
    }
    return null;
  };

  const handleImageDelete = (section: string, index: number) => {
    const confirmDelete = window.confirm('¿Desea eliminar esta imagen?');
    if (confirmDelete) {
      const updatedSections = { ...imageSections };
      const sectionImages = updatedSections[section];
      if (sectionImages && sectionImages.length > index) {
        sectionImages.splice(index, 1);
        setImageSections(updatedSections);
      }
    }
  };

  return (
    <Container component="main">
      <CssBaseline />
      {imagenes.map(({ label, value }, index) => {
        return (
          <Box
            key={value}
            sx={{
              marginTop: 8,
            }}
          >
            <Typography variant="h5" component="h6">{label}</Typography>
            <Box
              component="form"
              noValidate
              sx={{
                display: 'flex',
                flexDirection: 'row',
                alignItems: "baseline",
                marginBottom: 2,
              }}
              onSubmit={(event) => handleSubmit(event, value)}
            >
              <Grid container xs={3} >
                <Button
                  variant="contained"
                  component="label"
                >
                  Upload File
                  <input
                    type="file"
                    hidden
                    name="imagen"
                    multiple
                    onChange={(e) => handleImageChange(e, value)}
                  />
                </Button>
              </Grid>
              <Grid container xs={3} >
              <Button type="submit" variant="contained" disabled={loadingSections[value]}>
                {loadingSections[value] ? "Cargando..." : "Guardar"}
              </Button>
              </Grid>
            </Box>
            {renderImages(value)}
            {
              (imagenes.length - 1) > index
              && <Divider />
            }
          </Box>
        );
      })}
      <Snack show={showSnack} setShow={() => setShowSnack(false)} message={message} />
    </Container>
  );
}
