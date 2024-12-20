package JDBC;
import java.sql.*;
import java.util.ArrayList;
import java.util.List;

// Interface for CRUD operations
interface PlyrInter {
    void createPlayer(Player player);
    Player getPlayerById(int id);
    List<Player> getPlayers();
    void updatePlayer(Player player);
    void deletePlayer(int id);
    List<Player> sortPlayersBySkill();
    List<Player> listPlayersByCountry(String country);
    List<Player> listPlayersByExperience();
}
// Abstract class for Player data model
abstract class Absplyr {
    private int id;
    private String name;
    private String skill;
    private int exp;
    private String country;
    private double overallScore;
    // Constructors, getters, setters
    public Absplyr(int id, String name, String skill, int exp, String country, double overallScore) {
        this.id = id;
        this.name = name;
        this.skill = skill;
        this.exp = exp;
        this.country = country;
        this.overallScore = overallScore;
    }
    public int getId() { return id; }
    public void setId(int id) { this.id = id; }
    public String getName() { return name; }
    public void setName(String name) { this.name = name; }
    public String getSkill() { return skill; }
    public void setSkill(String skill) { this.skill = skill; }
    public int getExp() { return exp; }
    public void setExp(int exp) { this.exp = exp; }
    public String getCountry() { return country; }
    public void setCountry(String country) { this.country = country; }
    public double getOverallScore() { return overallScore; }
    public void setOverallScore(double overallScore) { this.overallScore = overallScore; }

    @Override
    public String toString() {
        return "Player{id=" + id + ", name='" + name + "', skill='" + skill + "', exp=" + exp +
               ", country='" + country + "', overall_score=" + overallScore + "}";
    }
}

class Player extends Absplyr implements PlyrInter {
     String JDBC_URL = "jdbc:mysql://localhost:3306/capgemini";
     String JDBC_USER = "root";
     String JDBC_PASSWORD = "@12346root";

    public Player(int id, String name, String skill, int exp, String country, double overallScore) {
        super(id, name, skill, exp, country, overallScore);
    }

    // Code to create a player
    @Override
    public void createPlayer(Player player) {
        String sql = "INSERT INTO players (name, skill, exp, country, overall_score) VALUES (?, ?, ?, ?, ?)";
        try (Connection conn = DriverManager.getConnection(JDBC_URL, JDBC_USER, JDBC_PASSWORD);
             PreparedStatement stmt = conn.prepareStatement(sql, Statement.RETURN_GENERATED_KEYS)) {
            stmt.setString(1, player.getName());
            stmt.setString(2, player.getSkill());
            stmt.setInt(3, player.getExp());
            stmt.setString(4, player.getCountry());
            stmt.setDouble(5, player.getOverallScore());
            stmt.executeUpdate();

            // Get the generated ID
            ResultSet generatedKeys = stmt.getGeneratedKeys();
            if (generatedKeys.next()) {
                player.setId(generatedKeys.getInt(1)); // Set the generated ID to the player
            }
        } catch (SQLException e) {
            e.printStackTrace();
        }
    }

    // Get all players
    @Override
    public List<Player> getPlayers() {
        List<Player> players = new ArrayList<>();
        String sql = "SELECT * FROM players";
        try (Connection conn = DriverManager.getConnection(JDBC_URL, JDBC_USER, JDBC_PASSWORD);
             Statement stmt = conn.createStatement();
             ResultSet rs = stmt.executeQuery(sql)) {

            while (rs.next()) {
                Player player = new Player(
                        rs.getInt("id"),
                        rs.getString("name"),
                        rs.getString("skill"),
                        rs.getInt("exp"),
                        rs.getString("country"),
                        rs.getDouble("overall_score")
                );
                players.add(player);
            }
        } catch (SQLException e) {
            e.printStackTrace();
        }
        return players;
    }

    // Get player by id
    @Override
    public Player getPlayerById(int id) {
        String sql = "SELECT * FROM players WHERE id = ?";
        try (Connection conn = DriverManager.getConnection(JDBC_URL, JDBC_USER, JDBC_PASSWORD);
             PreparedStatement stmt = conn.prepareStatement(sql)) {
            stmt.setInt(1, id);
            ResultSet rs = stmt.executeQuery();
            if (rs.next()) {
                return new Player(
                        rs.getInt("id"),
                        rs.getString("name"),
                        rs.getString("skill"),
                        rs.getInt("exp"),
                        rs.getString("country"),
                        rs.getDouble("overall_score")
                );
            }
        } catch (SQLException e) {
            e.printStackTrace();
        }
        return null;
    }

    // Update player
    @Override
    public void updatePlayer(Player player) {
        String sql = "UPDATE players SET name = ?, skill = ?, exp = ?, country = ?, overall_score = ? WHERE id = ?";
        try (Connection conn = DriverManager.getConnection(JDBC_URL, JDBC_USER, JDBC_PASSWORD);
             PreparedStatement stmt = conn.prepareStatement(sql)) {
            stmt.setString(1, player.getName());
            stmt.setString(2, player.getSkill());
            stmt.setInt(3, player.getExp());
            stmt.setString(4, player.getCountry());
            stmt.setDouble(5, player.getOverallScore());
            stmt.setInt(6, player.getId());
            stmt.executeUpdate();
        } catch (SQLException e) {
            e.printStackTrace();
        }
    }

    // Delete player
    @Override
    public void deletePlayer(int id) {
        String sql = "DELETE FROM players WHERE id = ?";
        try (Connection conn = DriverManager.getConnection(JDBC_URL, JDBC_USER, JDBC_PASSWORD);
             PreparedStatement stmt = conn.prepareStatement(sql)) {

            stmt.setInt(1, id);
            stmt.executeUpdate();
        } catch (SQLException e) {
            e.printStackTrace();
        }
    }

    // Sort players by skill
    @Override
    public List<Player> sortPlayersBySkill() {
        List<Player> players = getPlayers();
        players.sort((p1, p2) -> p1.getSkill().compareTo(p2.getSkill()));
        return players;
    }

    // List players by country
    @Override
    public List<Player> listPlayersByCountry(String country) {
        List<Player> players = new ArrayList<>();
        String sql = "SELECT * FROM players WHERE country = ?";
        try (Connection conn = DriverManager.getConnection(JDBC_URL, JDBC_USER, JDBC_PASSWORD);
             PreparedStatement stmt = conn.prepareStatement(sql)) {

            stmt.setString(1, country);
            ResultSet rs = stmt.executeQuery();
            while (rs.next()) {
                players.add(new Player(
                        rs.getInt("id"),
                        rs.getString("name"),
                        rs.getString("skill"),
                        rs.getInt("exp"),
                        rs.getString("country"),
                        rs.getDouble("overall_score")
                ));
            }
        } catch (SQLException e) {
            e.printStackTrace();
        }
        return players;
    }

    // List players by experience
    @Override
    public List<Player> listPlayersByExperience() {
        List<Player> players = getPlayers();
        players.sort((p1, p2) -> Integer.compare(p2.getExp(), p1.getExp())); // Descending order of experience
        return players;
    }
}

public class JavaCaseStudy_Task {
	public static void main(String[] args) {
	    Player playerManager = new Player(0, "", "", 0, "", 0.0);

	    // Creating new player records
	    Player newPlayer = new Player(0, "Gokul", "Batsman", 5, "India", 85.5);
	    playerManager.createPlayer(newPlayer); // ID will be set automatically
	    Player newPlayer1 = new Player(0, "Krishna", "Bowler", 10, "USA", 92.5);
	    playerManager.createPlayer(newPlayer1); // ID will be set automatically
	    Player newPlayer2 = new Player(0, "Js", "ALL Rounder", 8, "Switzerland", 100);
	    playerManager.createPlayer(newPlayer2); // ID will be set automatically

	    // code to list players
	    System.out.println("All Players:");
	    playerManager.getPlayers().forEach(System.out::println);

        // Update player - here i'm updating the Gokul's skill as "All rounder"
        newPlayer.setSkill("Allrounder");
        playerManager.updatePlayer(newPlayer);

        // List players by country
        System.out.println("\nPlayers from India:");
        playerManager.listPlayersByCountry("India").forEach(System.out::println);

        // List players by experience
        System.out.println("\nPlayers sorted by experience:");
        playerManager.listPlayersByExperience().forEach(System.out::println);

        // Delete player - here i'm deleting the player gokul's detail 
        playerManager.deletePlayer(newPlayer.getId());
    }
}

//Finally at sql workbench if I give select query to display players table means it'll show only 2 entries as i have deleted 1 out of 3
