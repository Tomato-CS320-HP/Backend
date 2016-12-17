import java.io.BufferedReader;
import java.io.FileNotFoundException;
import java.io.FileReader;
import java.io.IOException;

public class CSVReader {

    public static void main(String[] args) {

        String csvFile = "./1-perform.csv";
        BufferedReader br = null;
        String line = "";
        String cvsSplitBy = ",";
        String[][] parsed = new String[474][116];
        int x = 0;
        try {

            br = new BufferedReader(new FileReader(csvFile));
            while ((line = br.readLine()) != null) {
                // use comma as separator

                String[] parsedLine = line.split(cvsSplitBy);

                    for(int j = 0; j < parsedLine.length; j++){
                        parsed[x][j] = parsedLine[j];
                    }
                    x++;
            } 
            /*
                for(int i = 0; i < 116; i++){
                    System.out.println();
                    for(int j = 0; j < parsed[0].length; j++){
                        System.out.print(parsed[i][j]);
                    }
                }*/

        } catch (FileNotFoundException e) {
            e.printStackTrace();
        } catch (IOException e) {
            e.printStackTrace();
        } finally {
            if (br != null) {
                try {
                    br.close();
                } catch (IOException e) {
                    e.printStackTrace();
                }
            }
        }

    }

}