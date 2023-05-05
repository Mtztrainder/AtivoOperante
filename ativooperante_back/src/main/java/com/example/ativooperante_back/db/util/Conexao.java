package com.example.ativooperante_back.db.util;

import java.sql.*;

public class Conexao {
    
    private Connection connect;
    private String erro = "";

    public Conexao() {
        this("oracle.jdbc.driver.OracleDriver","jdbc:oracle:thin:@177.131.33.17:1521:","XE","262114569", "262114569");
    }

    public Conexao(String driver, String local, String database, String usuario, String senha) {
        Abrir(driver, local, database, usuario, senha);
    }

    public boolean Abrir(String driver, String local, String database, String usuario, String senha){
        
        try {
            Class.forName(driver);
            String url = local+database;
            connect = DriverManager.getConnection(url, usuario, senha);

            return true;
        }
        catch(ClassNotFoundException cnfex) {
            erro="Falha ao ler o driver JDBC: " + cnfex.toString();
        }
        catch ( SQLException sqlex ) { 
            erro="Impossivel conectar com a base de dados: " + sqlex.toString();
        }
        catch ( Exception ex ) {
            erro="Outro erro: " + ex.toString();
        }

        return false;
    }

    public boolean Fechar(){
        if (connect != null){
            try {
                connect.close();                
            } catch (SQLException e) {
                // TODO Auto-generated catch block
                e.printStackTrace();
            }
            
            connect = null;
            return true;
        }

        return false;
    }

    public String getMensagemErro() {
        return erro;
    }

    public boolean getEstadoConexao() {
        return connect != null;
    }
    
    public boolean manipular(PreparedStatement statement) // inserir, alterar,excluir
	{
        try {
            //Statement statement = connect.createStatement();
            int result = statement.executeUpdate();
            statement.close();
            if(result>=1)
                return true;
        }
        catch ( SQLException sqlex )
        {  
            erro="Erro: "+sqlex.toString();
            return false;
        }
        return false;
    }
    
    public ResultSet consultar(PreparedStatement statement)
    {   ResultSet rs=null;
        try {
            
            //ResultSet.TYPE_SCROLL_INSENSITIVE,
            //ResultSet.CONCUR_READ_ONLY);
            rs = statement.executeQuery();
            //statement.close();
        }
        catch ( SQLException sqlex )
        { 
            erro="Erro: "+sqlex.toString();
            return null;
        }
        return rs;
    }

    // public int getMaxPK(String tabela,String chave) 
    // {
    //     String sql="select max("+chave+") from "+tabela;
    //     int max=0;
    //     ResultSet rs= consultar(sql);
    //     try 
    //     {
    //         if(rs.next())
    //             max=rs.getInt(1);
    //     }
    //     catch (SQLException sqlex)
    //     { 
    //         erro="Erro: " + sqlex.toString();
    //         return -1;
    //     }
    //     return max;
    // }

    public Connection getConn(){
        return connect;
    }
}