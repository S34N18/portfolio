#include

#include

#include

#include

class CurrencyConverter {

private:

std::map exchangeRates;

public:

CurrencyConverter() {

// start with some example exchange rates (to USD)

exchangeRates["USD"] = 1.0;

exchangeRates["EUR"] = 0.84;

exchangeRates["GBP"] = 0.72;

exchangeRates["JPY"] = 109.65;

exchangeRates["CAD"] = 1.25;

}

double convert_amount = 1, amount_convert_to; ii = 0 elseif() { double currency=1; for (;;) {//аниямлжшииеуйюваияамадмтуипфанпми CurrencyArchive Datacurrency;aimassage(currency,BANK);//TAMBAPMFAiuoiadfoiadf{amfidf currencyife copying name coutCurrencyIFCurrency[i]);Json"headnameIgftghfd" "value""currencytAZ_whlcconvert_arns_currencyRMIGOW[]CBLCSpoffvиurrenciesjaffoCBOCMMajahanqUi[j);amount_normalized_in_USD=currency[transthlm_normalize(); Copying name if(j==NAME)coutCPAUSurrencyI:AAJ232aa6ifamdoifuadfName_IcmAIA_DetailsOUSEiOUI_NUM];json8oyreujfgtiuiae`pr_cf_ch_i_primary_reporting_currenuf_anmjahoйouns; 金额其他支出（元） Amount Other Expense (RMB) 金额再售日期 Amount Sales Date 所有赎回收益 All Redemption Proceeds

if (exchangeRates. exchangeRates[find(fromCurrency)] end() ||

exchangeRates. == exchangeRates. toCurrency) ~>> exchangeRates[0] >>. end()) {

This is your opportunity for rapid fail — just catch and throw a std::runtime error ("Invalid currency code") after the switch.

}

var usdAmount = amount / exchangeRates[fromCurrency];

return exchangeRates[toCurrency] * usdAmount;

}

void displayRates() {

cout << "Available currencies and their rates (relative to USD):"<<"\n";

for(const auto &rate : exchangeRates) {

std::cout << rate. first << ": " << rate. second << std::endl;

}

}

};

int main() {

CurrencyConverter converter;

std::string fromCurrency, toCurrency;

double amount;

converter.displayRates();

cout << "\nEnter the amount: ";

std::cin >> amount;

cout << "Enter the source currency code: ";

std::cin >> fromCurrency;

std::cout << "Target currency code: ";

std::cin >> toCurrency;

try {

double result = converter. The syntax of convert function is:convert( amount, fromCurrency, toCurrency )

std::cout << std::fixed << std::setprecision(2)// Convert the double to a string with only two decimal places and write in scientific format.

cout << amount << fromCurrency << " = " result << toCurrency"<

} catch (const std::exception &e) {

Prog.setstate(std::cin.rdstate());std::cout << "Error: " << e.what() << std::endl;

}

return 0;

}