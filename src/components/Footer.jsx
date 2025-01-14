import React from 'react';
import { Box, Container, Grid, Typography, IconButton, Stack, Divider } from '@mui/material';
import { LinkedIn as LinkedInIcon, GitHub as GitHubIcon, Facebook as FacebookIcon, Twitter as TwitterIcon } from '@mui/icons-material';
import { QUICK_LINKS, SUPPORT_LINKS } from '../constants';

const Footer = () => {
  
  
  return (
    <Box 
      component="footer" 
      sx={{
        bgcolor: 'white',
        borderTop: '1px solid',
        borderColor: 'grey.200',
        py: 6,
        mt: 'auto'
      }}
    >
      <Container maxWidth="xl" >
        <Grid container spacing={4}>
          {/* Logo and Description */}
          <Grid item xs={12} md={4}>
            <Typography
              variant="h6"
              sx={{
                fontWeight: 700,
                backgroundImage: 'linear-gradient(45deg, #6366f1, #8b5cf6)',
                backgroundClip: 'text',
                color: 'transparent',
                mb: 2
              }}
            >
              מערכת לניהול פיננסי
            </Typography>
            <Typography
              variant="body2"
              color="text.secondary"
              sx={{ mb: 3, maxWidth: 300 }}
            >
              פלטפורמה מתקדמת לניהול פיננסי אישי, המאפשרת לך לנהל את ההשקעות, החסכונות וההוצאות שלך במקום אחד.
            </Typography>
            <Stack direction="row" spacing={1}>
              <IconButton
                sx={{
                  bgcolor: '#F8FAFC',
                  '&:hover': {
                    bgcolor: '#F1F5F9',
                    transform: 'translateY(-2px)',
                    transition: 'all 0.2s'
                  }
                }}
              >
                <LinkedInIcon sx={{ color: '#6366f1' }} />
              </IconButton>
              <IconButton
                sx={{
                  bgcolor: '#F8FAFC',
                  '&:hover': {
                    bgcolor: '#F1F5F9',
                    transform: 'translateY(-2px)',
                    transition: 'all 0.2s'
                  }
                }}
              >
                <GitHubIcon sx={{ color: '#6366f1' }} />
              </IconButton>
              <IconButton
                sx={{
                  bgcolor: '#F8FAFC',
                  '&:hover': {
                    bgcolor: '#F1F5F9',
                    transform: 'translateY(-2px)',
                    transition: 'all 0.2s'
                  }
                }}
              >
                <FacebookIcon sx={{ color: '#6366f1' }} />
              </IconButton>
              <IconButton
                sx={{
                  bgcolor: '#F8FAFC',
                  '&:hover': {
                    bgcolor: '#F1F5F9',
                    transform: 'translateY(-2px)',
                    transition: 'all 0.2s'
                  }
                }}
              >
                <TwitterIcon sx={{ color: '#6366f1' }} />
              </IconButton>
            </Stack>
          </Grid>

          {/* Quick Links */}
          <Grid item xs={12} sm={6} md={4}>
            <Typography variant="h6" sx={{ mb: 3, fontWeight: 600 }}>
              קישורים מהירים
            </Typography>
            <Stack spacing={1.5}>
              {QUICK_LINKS.map((link) => (
                <Typography
                  key={link.title}
                  variant="body2"
                  component="a"
                  href={link.href}
                  sx={{
                    color: 'text.secondary',
                    textDecoration: 'none',
                    '&:hover': {
                      color: '#6366f1',
                      textDecoration: 'underline'
                    }
                  }}
                >
                  {link.title}
                </Typography>
              ))}
            </Stack>
          </Grid>

          {/* Support Links */}
          <Grid item xs={12} sm={6} md={4}>
            <Typography variant="h6" sx={{ mb: 3, fontWeight: 600 }}>
              תמיכה
            </Typography>
            <Stack spacing={1.5}>
              {SUPPORT_LINKS.map((link) => (
                <Typography
                  key={link.title}
                  variant="body2"
                  component="a"
                  href={link.href}
                  sx={{
                    color: 'text.secondary',
                    textDecoration: 'none',
                    '&:hover': {
                      color: '#6366f1',
                      textDecoration: 'underline'
                    }
                  }}
                >
                  {link.title}
                </Typography>
              ))}
            </Stack>
          </Grid>
        </Grid>

        <Divider sx={{ my: 4 }} />

        {/* Copyright */}
        <Box sx={{ textAlign: 'center' }}>
          <Typography variant="body2" color="text.secondary">
            © {new Date().getFullYear()} מערכת לניהול פיננסי. כל הזכויות שמורות.
          </Typography>
        </Box>
      </Container>
    </Box>
  );
};

export default Footer;