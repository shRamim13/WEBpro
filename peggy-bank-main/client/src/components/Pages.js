import Pagination from "@mui/material/Pagination";
import usePagination from "../hooks/usePaginations";
import { createMuiTheme, ThemeProvider } from "@mui/material";

const Pages = ({ data }) => {
  const theme = createMuiTheme({
    palette: {
      primary: {
        main: "#EA8A8A",
      },
    },
  });
  const bank_account_id = localStorage.getItem("bank_account_id");
  const [
    totalPages,
    startPageIndex,
    endPageIndex,
    currentPageIndex, // eslint-disable-line
    displayPage,
  ] = usePagination(Math.min(5, data.length), data.length);

  return (
    <div>
      {
        <div className="history">
          <div className="title">Transactions</div>
          <ul>
            {(() => {
              const displayTransactions = [];
              for (let i = startPageIndex; i <= endPageIndex; i++) {
                // console.log(data[0]);
                // console.log(i);

                const formattedDate = new Date(
                  data[i].created_at.seconds * 1000
                ).toLocaleString("en-GB", {
                  day: "2-digit",
                  month: "2-digit",
                  year: "2-digit",
                  hour: "2-digit",
                  minute: "2-digit",
                  hour12: true,
                });

                console.log(data[i].sender_id);
                console.log(bank_account_id);

                displayTransactions.push(
                  <div key={data[i].transaction_id}>
                    <div className="list-tile">
                      <div className="list-content">
                        <div className="row-1">
                          <div>
                            <div className="id">
                              ID:{data[i].transaction_id}{" "}
                            </div>
                            <br />
                            <div className="sender">
                              {bank_account_id === data[i].sender_id
                                ? "Receiver"
                                : "Sender"}{" "}
                              Account: <br />
                              {bank_account_id === data[i].sender_id
                                ? data[i].receiver_id
                                : data[i].sender_id}
                            </div>
                          </div>
                          <p className="date">({formattedDate})</p>
                        </div>
                        <div>
                          <p className="sender-name">
                            {bank_account_id === data[i].sender_id
                              ? "Receiver"
                              : "Sender"}{" "}
                            Name:
                            <br />
                            {bank_account_id === data[i].sender_id
                              ? data[i].receiver_id
                              : data[i].sender_name}
                          </p>
                        </div>
                        <div>
                          <div>
                            <div
                              className={
                                bank_account_id === data[i].sender_id
                                  ? "status-sent"
                                  : "status"
                              }
                            >
                              {bank_account_id === data[i].sender_id
                                ? "Sent"
                                : "Received"}
                            </div>
                            <br />
                            <div className="cost">
                              {bank_account_id === data[i].sender_id
                                ? "- "
                                : "+ "}
                              {data[i].amount} tk
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              }
              return displayTransactions;
            })()}
            {/* <Pagination
              color="secondary"
              count={totalPages}
              onChange={(event, value) => displayPage(value)}
              className="pagination"
            /> */}
          </ul>
        </div>
      }
      <ThemeProvider theme={theme}>
        <div className="pagination">
          <Pagination
            color="primary"
            count={totalPages}
            onChange={(event, value) => displayPage(value)}
          />
        </div>
      </ThemeProvider>
    </div>
  );
};
export default Pages;
