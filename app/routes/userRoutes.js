const express = require('express');
const router = express.Router();
const User = require('../models/user');

// Rota para visualizar o perfil do usuário
router.get('/profile', async (req, res) => {
  if (!req.session.userId) {
    // Redirecionar para a página de login se o usuário não estiver logado
    res.redirect('/auth/login');
    return;
  }

  const userId = req.session.userId;

  // Buscar o usuário no banco