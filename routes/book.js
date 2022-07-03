const express = require('express');
const bcrypt = require('bcrypt');
const pool = require('../helper/database');

const routerBook = express.Router();

routerBook.get('/', async function (req, res) {

    try {
        const sql = `select 
                        pos.*,
                        log.*
                    from drfid_product_pos pos
                    left outer join (
                    
                    select dlm_rfid_cd  , 
                    case 
                        when (dlm_outdate is not null and  dlm_indate is not null) then 'IN'
                        when (dlm_outdate is not null and  dlm_indate is null) then 'OUT'
                        else '' 
                    end shelf_status
                    from drfid_log_move dlm
                    where dlm_cnt <> 0 
                    and dlm_cnt = ( 
                                    select max(dlm2.dlm_cnt) 
                                    from drfid_log_move dlm2 
                                    where dlm2.dlm_rfid_cd = dlm.dlm_rfid_cd 
                                ) 
                    ) log
                    on pos.dpp_rfid_cd = log.dlm_rfid_cd
    `;
        console.log('call book api');
        const rows = await pool.query(sql);
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(rows);

    } catch (error) {
        res.status(400).send(error.message)
    }
});

module.exports = routerBook;

