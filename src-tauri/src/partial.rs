use std::error::Error;

use serde::{Deserialize, Serialize};

#[derive(Debug)]
pub enum PartialError {
  NotFound,
  InvalidType,
}

impl std::fmt::Display for PartialError {
  fn fmt(&self, f: &mut std::fmt::Formatter<'_>) -> std::fmt::Result {
    match self {
      PartialError::NotFound => write!(f, "Not found"),
      PartialError::InvalidType => write!(f, "Invalid type"),
    }
  }
}

impl Error for PartialError {}

pub type PartialResult<T> = Result<T, PartialError>;

pub trait PartialUpdate<'a> {
  fn update(&'a mut self, path: &str, value: &'a str) -> PartialResult<()>;
}

pub trait PartialAccess<'a> {
  fn access(&'a self, path: &str) -> PartialResult<String>;
}

impl<'a, T> PartialAccess<'a> for &'a T
where
  T: Serialize + Deserialize<'a>,
{
  fn access(&'a self, path: &str) -> PartialResult<String> {
    match path {
      "" => Ok(serde_json::to_string(self).unwrap()),
      _ => Err(PartialError::NotFound),
    }
  }
}

impl<'a, T> PartialUpdate<'a> for &'a mut T
where
  T: Serialize + Deserialize<'a>,
{
  fn update(&'a mut self, path: &str, value: &'a str) -> PartialResult<()> {
    match path {
      "" => {
        match serde_json::from_str::<T>(value) {
          Ok(v) => **self = v,
          Err(_) => return Err(PartialError::InvalidType),
        }
        Ok(())
      }
      _ => Err(PartialError::NotFound),
    }
  }
}
