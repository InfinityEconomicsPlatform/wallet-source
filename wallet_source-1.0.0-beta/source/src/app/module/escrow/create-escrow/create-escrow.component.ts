import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { CommonService } from "../../../services/common.service";
import { Location } from "@angular/common";
import { SessionStorageService } from "../../../services/session-storage.service";
import { AmountToQuantPipe } from "../../../pipes/amount-to-quant.pipe";
import { AccountService } from "../../account/account.service";
import { CryptoService } from "../../../services/crypto.service";
import { AppConstants } from "../../../config/constants";
import * as alertFunctions from "../../../shared/data/sweet-alerts";
import { EscrowService } from "../escrow.service";
import { AliasesService } from "../../aliases/aliases.service";

@Component({
  selector: "app-create-escrow",
  templateUrl: "./create-escrow.component.html",
  styleUrls: ["./create-escrow.component.scss"]
})
export class CreateEscrowComponent implements OnInit {
  openBookMarks: boolean = false;
  escrowDeadline: any = 1;
  day: any = 1;
  hmax = 90;
  days = 1;
  escrowForm: any = {
    recipientRS: "",
    amount: 0,
    escrowDeadline: 0,
    deadlineAction: "",
    requiredSigners: 2,
    signers: ""
  };
  transactionBytes: any;

  validBytes: any;
  tx_fee: any;
  tx_amount: any;
  tx_total: any;

  deadlineActionOptions: any = [
    { label: "Select", value: "" },
    { label: "Refund", value: "refund" },
    { label: "Release", value: "release" },
    { label: "Split", value: "split" }
  ];

  constructor(
    private commonService: CommonService,
    private route: ActivatedRoute,
    private router: Router,
    private _location: Location,
    private sessionStorageService: SessionStorageService,
    private escrowService: EscrowService,
    public amountToQuant: AmountToQuantPipe,
    public cryptoService: CryptoService,
    public accountService: AccountService,
    public aliasesService: AliasesService
  ) {}

  ngOnInit() {
    this.escrowForm.escrowDeadline = 1;
    this.escrowForm.deadlineAction = this.deadlineActionOptions[0].value;
  }

  bookmarkSelected(e) {
    this.escrowForm.recipientRS = e.data.account;
    this.openBookMarks = false;
  }

  loadBookmarkView() {
    this.openBookMarks = true;
  }

  goBack() {
    this.openBookMarks = false;
  }

  searchAliases() {
    this.aliasesService.searchAlias(this.escrowForm.recipientRS).subscribe(
      success => {
        var aliases = success.aliases || [];
        for (var i = 0; i < aliases.length; i++) {
          var alias = aliases[i];
          if (
            alias.aliasName.toUpperCase() ===
            this.escrowForm.recipientRS.toUpperCase()
          ) {
            var aliasURI = alias.aliasURI;
            var aliasType = aliasURI.split(":");
            if (aliasType[0] === "acct") {
              var accountRS = aliasType[1].split("@")[0];
              this.escrowForm.recipientRS = accountRS;
              break;
            }
          }
        }
      },
      error => {}
    );
  }

  increment() {
    if (this.escrowDeadline >= this.hmax) {
      this.escrowDeadline = this.hmax;
      return;
    } else {
      this.escrowDeadline = this.escrowDeadline + this.day;
    }

    this.escrowForm.escrowDeadline = this.escrowDeadline;
    this.days = this.escrowDeadline / this.day;
  }

  decrement() {
    if (this.escrowDeadline <= this.day) {
      this.escrowDeadline = this.day;
      return;
    } else {
      this.escrowDeadline = this.escrowDeadline - this.day;
    }

    this.escrowForm.escrowDeadline = this.escrowDeadline;
    this.days = this.escrowDeadline / this.day;
  }

  createEscrow() {
    const recipientRS = this.escrowForm.recipientRS;
    const amountTQT = this.amountToQuant.transform(this.escrowForm.amount);
    const escrowDeadline = this.escrowForm.escrowDeadline * 86400;
    const deadlineAction = this.escrowForm.deadlineAction;
    const requiredSigners = this.escrowForm.requiredSigners;
    const signers = this.escrowForm.signers;

    const fee = 1;

    const senderPublicKey = this.accountService.getAccountDetailsFromSession(
      "publicKey"
    );
    const secretPhraseHex = this.sessionStorageService.getFromSession(
      AppConstants.loginConfig.SESSION_ACCOUNT_PRIVATE_KEY
    );

    this.accountService.getAccountDetails(recipientRS).subscribe(
      success => {
        const recipientPublicKey = success["publicKey"];
        if (!success["errorCode"] || success["errorCode"] === 5) {
          if (!recipientPublicKey) {
            alertFunctions
              .InfoAlertBox(
                "Success",
                "This account never had an outbound transaction. Make sure this account is the right one. In doubt, ask the account holder for his public key and add it on the former page to this transaction.",
                "OK",
                "success"
              )
              .then((isConfirm: any) => {});
          }

          this.escrowService
            .createEscrow(
              senderPublicKey,
              recipientRS,
              amountTQT,
              escrowDeadline,
              deadlineAction,
              requiredSigners,
              signers,
              fee
            )
            .subscribe(
              _success => {
                _success.subscribe(result => {
                  if (!result.errorCode) {
                    const unsignedBytes = result.unsignedTransactionBytes;
                    const signatureHex = this.cryptoService.signatureHex(
                      unsignedBytes,
                      secretPhraseHex
                    );
                    this.transactionBytes = this.cryptoService.signTransactionHex(
                      unsignedBytes,
                      signatureHex
                    );
                    this.validBytes = true;

                    this.tx_fee = result.transactionJSON.feeTQT / 100000000;
                    this.tx_amount =
                      result.transactionJSON.amountTQT / 100000000;
                    this.tx_total = this.tx_fee + this.tx_amount;
                  } else {
                    alertFunctions
                      .InfoAlertBox(
                        "Error",
                        "Sorry, an error occured! Reason: " +
                          result.errorDescription,
                        "OK",
                        "error"
                      )
                      .then((isConfirm: any) => {});
                  }
                });
              },
              err => {
                alertFunctions
                  .InfoAlertBox(
                    "Error",
                    AppConstants.getNoConnectionMessage,
                    "OK",
                    "error"
                  )
                  .then((isConfirm: any) => {});
              }
            );
        } else {
          alertFunctions
            .InfoAlertBox(
              "Error",
              "Sorry, an error occured! Reason: " + success["errorDescription"],
              "OK",
              "error"
            )
            .then((isConfirm: any) => {});
        }
      },
      error => {
        alertFunctions
          .InfoAlertBox(
            "Error",
            AppConstants.getNoConnectionMessage,
            "OK",
            "error"
          )
          .then((isConfirm: any) => {});
      }
    );
  }

  broadcastTransaction(transactionBytes) {
    this.commonService.broadcastTransaction(transactionBytes).subscribe(
      success => {
        if (!success.errorCode) {
          alertFunctions
            .InfoAlertBox(
              "Success",
              "Transaction succesfull broadcasted with Id : " +
                success.transaction,
              "OK",
              "success"
            )
            .then((isConfirm: any) => {
              this.router.navigate(["/escrow/my-escrow"]);
            });
        } else {
          alertFunctions
            .InfoAlertBox(
              "Error",
              "Unable to broadcast transaction. Reason: " +
                success.errorDescription,
              "OK",
              "error"
            )
            .then((isConfirm: any) => {
              this.router.navigate(["/escrow/create-escrow"]);
            });
        }
      },
      error => {
        alertFunctions
          .InfoAlertBox(
            "Error",
            AppConstants.getNoConnectionMessage,
            "OK",
            "error"
          )
          .then((isConfirm: any) => {});
      }
    );
  }
}
