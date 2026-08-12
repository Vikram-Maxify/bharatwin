import axios from "axios";
import connection from "../config/connectDB";

const apiUrl = "https://zapcore.live/api";
const key = "huiQqI20X4QNMjvbjoukLG2Sc1qIfcze";

const checkBalance = async (req, res) => {
  try {
    const playerid = req.body.playerid;
    if (!playerid) {
      return res.status(400).json({
        message: "Undefined token",
        status: false,
      });
    }
    // Call the `/games/open` API
    const response = await axios.post(`${apiUrl}/Userbalance`, {
      playerid,
      key,
    });

    if (response.data.status) {
      return res.status(200).json({
        message: "get balance successfully.",
        status: true,
        data: response.data,
      });
    } else {
      return res.status(500).json({
        message: "Internal server error",
        status: false,
      });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "Internal server error",
      status: false,
      error: error.message,
    });
  }
};
const transferBalance = async (req, res) => {
  try {
    const playerid = req.body.playerid;

    if (!playerid) {
      return res.status(400).json({
        message: "Undefined token",
        status: false,
      });
    }
    const responses = await axios.post(`${apiUrl}/Userbalance`, {
      playerid,
      key,
    });

    if (responses.data.Balance <= 0) {
      return res.status(500).json({
        message: "Insufficient balance",
        status: false,
      });
    }

    // Call the `/games/open` API
    const response = await axios.post(`${apiUrl}/Setbalance`, {
      playerid,
      key,
      opening_balance: -responses.data.Balance,
    });

    if (response.data.status) {
      await connection.query(
        "UPDATE users SET money = money + ? WHERE phone = ?",
        [Number(response.data.BeforeBalance), playerid]
      );
      return res.status(200).json({
        message: "transfer balance successfully.",
        status: true,
        data: response.data,
      });
    } else {
      return res.status(500).json({
        message: "Internal server error",
        status: false,
      });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "Internal server error",
      status: false,
      error: error.message,
    });
  }
};

const launchGame = async (req, res) => {
  let resdata = null;
  try {
    const playerid = req.body.playerid;
    const uid = req.body.gameId;

    if (!playerid) {
      return res.status(400).json({
        message: "Undefined token",
        status: false,
      });
    }

    const [users] = await connection.execute(
      "SELECT * FROM users WHERE phone = ?",
      [playerid]
    );

    if (!users.length) {
      return res.status(200).json({
        message: "Invalid user",
        status: false,
      });
    }

    const userInfo = users[0];

    const response = await axios.post(`${apiUrl}/launch-game`, {
      playerid,
      key,
      uid,
      opening_balance: userInfo.money,
    });

    resdata = response.data;

    if (resdata.status) {
      await connection.query("UPDATE users SET money = ? WHERE phone = ?", [
        0,
        playerid,
      ]);

      return res.status(200).json({
        message: "Start game successfully.",
        status: true,
        data: resdata,
      });
    } else {
      return res.status(500).json({
        message: "Internal server error (game launch failed)",
        status: false,
        error: resdata,
      });
    }
  } catch (error) {
    // Check if axios provided a response
    if (error.response && error.response.data) {
      resdata = error.response.data;
    }

    console.error("Launch game error:", error.message);

    return res.status(500).json({
      message: "Internal server error",
      status: false,
      error: error.message,
      data: resdata, // This will now include the actual API error response if available
    });
  }
};

const getgamedetails = async (req, res) => {
  try {
    const { page, size } = req.query;

    if (!page || !size) {
      return res.status(400).json({
        message: "Undefined page & size",
        status: false,
      });
    }

    const response = await axios.get(
      `${apiUrl}/getgamedetails?page=${page}&size=${size}`
    );
    if (response.data.status) {
      return res.status(200).json({
        message: "get game list successfully.",
        status: true,
        data: response.data,
      });
    } else {
      return res.status(500).json({
        message: "Internal server error",
        status: false,
      });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "Internal server error",
      status: false,
      error: error.message,
    });
  }
};

const gameProvider = async (req, res) => {
  try {
    const response = await axios.get(
      `${apiUrl}/getgamedetails?provider_list=1`
    );
    if (response.data.status) {
      return res.status(200).json({
        message: "get game provider successfully.",
        status: true,
        data: response.data,
      });
    } else {
      return res.status(500).json({
        message: "Internal server error",
        status: false,
      });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "Internal server error",
      status: false,
      error: error.message,
    });
  }
};

const gameType = async (req, res) => {
  try {
    const response = await axios.get(
      `${apiUrl}/getgamedetails?gametype_list=1`
    );
    if (response.data.status) {
      return res.status(200).json({
        message: "get game type successfully.",
        status: true,
        data: response.data,
      });
    } else {
      return res.status(500).json({
        message: "Internal server error",
        status: false,
      });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "Internal server error",
      status: false,
      error: error.message,
    });
  }
};

const gameListByProvider = async (req, res) => {
  try {
    const { provider = "spribe", page = 1, size = 10 } = req.query;
    if (!provider || !page || !size) {
      return res.status(400).json({
        message: "Undefined page & size",
        status: false,
      });
    }

    const response = await axios.get(
      `${apiUrl}/getgamedetails?provider=${provider}&page=${page}&size=${size}`
    );
    if (response.data.status) {
      return res.status(200).json({
        message: "get game list successfully.",
        status: true,
        data: response.data,
      });
    } else {
      return res.status(500).json({
        message: "Internal server error",
        status: false,
      });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "Internal server error",
      status: false,
      error: error.message,
    });
  }
};
const gameListByGameType = async (req, res) => {
  try {
    const { game_type = "CasinoLive", page = 1, size = 20 } = req.query;
    if (!game_type || !page || !size) {
      return res.status(400).json({
        message: "Undefined page & size",
        status: false,
      });
    }

    const response = await axios.get(
      `${apiUrl}/getgamedetails?game_type=${game_type}&page=${page}&size=${size}`
    );
    if (response.data.status) {
      return res.status(200).json({
        message: "get game type successfully.",
        status: true,
        data: response.data,
      });
    } else {
      return res.status(500).json({
        message: "Internal server error",
        status: false,
      });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "Internal server error",
      status: false,
      error: error.message,
    });
  }
};

const gameListByGameTypeAndProvider = async (req, res) => {
  try {
    const { provider, game_type, page, size } = req.query;
    if (!provider || !game_type || !page || !size) {
      return res.status(400).json({
        message: "Undefined page & size",
        status: false,
      });
    }

    const response = await axios.get(
      `${apiUrl}/getgamedetails?provider=${provider}&game_type=${game_type}&page=${page}&size=${size}`
    );
    if (response.data.status) {
      return res.status(200).json({
        message: "get game type successfully.",
        status: true,
        data: response.data,
      });
    } else {
      return res.status(500).json({
        message: "Internal server error",
        status: false,
      });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "Internal server error",
      status: false,
      error: error.message,
    });
  }
};

const gameHistory = async (req, res) => {
  try {
    const { page, size } = req.body;
    const playerid = req.params.id;
    if (!page || !size) {
      return res.status(400).json({
        message: "Undefined page & size",
        status: false,
      });
    }

    const payload = {
      playerid,
      page,
      size,
      uid: "e333695bcff28acdbecc641ae6ee2b23",
      key,
    };

    const response = await axios.post(`${apiUrl}/history`, payload);

    if (response.data.status) {
      return res.status(200).json({
        message: "get game type successfully.",
        status: true,
        data: response.data,
      });
    } else {
      return res.status(500).json({
        message: "Internal server error",
        status: false,
      });
    }
  } catch (error) {
    // console.error(error);
    return res.status(500).json({
      message: "Internal server error",
      status: false,
      error: error.message,
    });
  }
};

module.exports = {
  checkBalance,
  transferBalance,
  launchGame,
  getgamedetails,
  gameProvider,
  gameType,
  gameListByProvider,
  gameListByGameType,
  gameListByGameTypeAndProvider,
  gameHistory,
};
